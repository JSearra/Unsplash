// unsplash.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UnsplashService } from './unsplash.service';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch images', () => {
    const mockResponse = { /* ... mock response data ... */ };

    service.searchImages('test', 1).subscribe(images => {
      expect(images).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('API_URL');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
