import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnsplashService } from '../services/unsplash.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [ CommonModule],
})
export class DetailsComponent implements OnInit {
  imageDetails: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private unsplashService: UnsplashService
  ) {}

  ngOnInit(): void {
    const imageId = this.route.snapshot.paramMap.get('id');
    if (imageId) {
      this.unsplashService.getImageDetails(imageId).subscribe(
        data => {
          this.imageDetails = data;
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching image details:', error);
          this.isLoading = false;
        }
      );
    }
  }
}