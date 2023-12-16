// unsplash.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UnsplashService } from './unsplash.service';
import { UnsplashImage } from '../interfaces/unsplash-image.interface'; // Replace with your actual path

describe('UnsplashService', () => {
  let service: UnsplashService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UnsplashService]
    });
    service = TestBed.inject(UnsplashService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
});
