import { Component } from '@angular/core';
import { UnsplashService } from '../services/unsplash.service';
import { UnsplashImage } from '../interfaces/unsplash-image.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SearchComponent {
  searchQuery = '';
  images: UnsplashImage[] = [];

  constructor(private unsplashService: UnsplashService, route: ActivatedRoute) {}

  onSearch(): void {
    console.log('Search query:', this.searchQuery);
    this.unsplashService.searchImages(this.searchQuery).subscribe(
      response => {
        console.log('Search results:', response);
        this.images = response.results;
      },
      error => console.error('Error fetching images:', error)
    );
  }
}
