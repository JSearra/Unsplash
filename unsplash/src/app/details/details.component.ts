import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnsplashService } from '../services/unsplash.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ImageDetails } from '../interfaces/image-details.interface';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [ CommonModule],
})
export class DetailsComponent implements OnInit {
  imageDetails: ImageDetails | null = null;
  errorMessage: string | null = null;
  private subscription: Subscription | null = null;


  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private unsplashService: UnsplashService
  ) {}

  ngOnInit(): void {
    
    const imageId = this.route.snapshot.paramMap.get('id');
    if (imageId) {
      this.unsplashService.getImageDetails(imageId).subscribe({
        next: data => {
          this.imageDetails = data;
          this.titleService.setTitle('GBTEC Image Details page');
        },
        error: error => {
          console.error('Error fetching image details:', error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}