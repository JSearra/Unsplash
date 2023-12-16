import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UnsplashService } from '../services/unsplash.service';
import { UnsplashImage } from '../interfaces/unsplash-image.interface';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { debounceTime, Subject, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

// Decorator 
@Component({
  selector: 'app-search', 
  templateUrl: './search.component.html', 
  styleUrls: ['./search.component.scss'], 
  standalone: true, 
  imports: [CommonModule, FormsModule, MatIconModule], 
})
export class SearchComponent implements OnInit {
  // Properties for state and data
  searchQuery = '';
  images: UnsplashImage[] = [];
  pageNumber = 1;
  errorMessage = '';
  loadingMoreContent = false;
  private scrollEvent = new Subject<void>();

  // Constructor to inject dependencies
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private unsplashService: UnsplashService,
    private router: Router
  ) {
    // Setting up a subscription with debounce to handle infinite scrolling
    // The debounce time is long due to the high occurence of rate limiting from Unsplash
    this.scrollEvent.pipe(
      debounceTime(700) // Debounce time to prevent rapid firing
    ).subscribe(() => this.loadMoreContent());
  }

  // Lifecycle hook for initialization logic
  ngOnInit() {
    // Check if running in a browser
    if (isPlatformBrowser(this.platformId)) {
      const lastSearchQuery = localStorage.getItem('lastSearchQuery');
      // If a last search query exists, use it to perform a search and set the title
      if (lastSearchQuery) {
        this.searchQuery = lastSearchQuery;
        this.titleService.setTitle(`Search for "${lastSearchQuery}" - GBTEC Image Search Page`);
        this.performSearch();
      } else {
        this.titleService.setTitle('GBTEC Image Search Page');
      }
    }
  }

  // Method to handle search logic
  onSearch(): void {
    this.titleService.setTitle(`Search for "${this.searchQuery}" - GBTEC Image Search Page`);
    this.pageNumber = 1;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lastSearchQuery', this.searchQuery);
    }
    this.performSearch();
  }

  // Method to perform the actual search
  performSearch(): void {
    this.unsplashService.searchImages(this.searchQuery, this.pageNumber).subscribe({
      next: (images) => this.images = images,
      error: (error) => this.errorMessage = error.message
    });
  }

  // Method to load more content on scrolling
  loadMoreContent(): void {
    if (this.loadingMoreContent) return;
    this.loadingMoreContent = true;
    this.pageNumber++;
    timer(300).pipe(
      switchMap(() => this.unsplashService.searchImages(this.searchQuery, this.pageNumber))
    ).subscribe({
      next: (images) => {
        this.images = [...this.images, ...images];
        this.loadingMoreContent = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loadingMoreContent = false;
      }
    });
  }


  // Navigate to the details component
  onImageClick(imageId: string): void {
    this.router.navigate(['/details', imageId]);
  }

  // HostListener to listen to the scroll event
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 50) {
      this.scrollEvent.next(); // Load more content when scrolled to bottom
    }
  }
}
