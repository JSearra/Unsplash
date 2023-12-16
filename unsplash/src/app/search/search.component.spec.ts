import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { UnsplashService } from '../services/unsplash.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Title } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { UnsplashImage } from '../interfaces/unsplash-image.interface';
import { Router } from '@angular/router';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let unsplashService: jasmine.SpyObj<UnsplashService>;
  let titleService: Title;

  beforeEach(async () => {
    unsplashService = jasmine.createSpyObj('UnsplashService', ['searchImages']);
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: UnsplashService, useValue: unsplashService },
        Title,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title and perform search if last search query exists', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('nature');
    spyOn(titleService, 'setTitle');
    spyOn(component, 'performSearch');

    component.ngOnInit();
    tick();

    expect(localStorage.getItem).toHaveBeenCalledWith('lastSearchQuery');
    expect(titleService.setTitle).toHaveBeenCalledWith('Search for "nature" - GBTEC Image Search Page');
    expect(component.performSearch).toHaveBeenCalled();
  }));

  it('should set default title if no last search query', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(titleService, 'setTitle');

    component.ngOnInit();

    expect(titleService.setTitle).toHaveBeenCalledWith('GBTEC Image Search Page');
  });

  it('should call searchImages on performSearch', () => {
    const mockImages: UnsplashImage[] = [
      {
        id: '1',
        urls: {
          small: 'http://example.com/small/1',
          
          regular: 'http://example.com/large/1'
        },
        description: 'Description for image 1',
        
        
      },
      {
        id: '2',
        urls: {
          small: 'http://example.com/small/2',
          regular: 'http://example.com/medium/2',
          
        },
        description: 'Description for image 2',
        
        
      }
      
    ];
    unsplashService.searchImages.and.returnValue(of(mockImages));

    component.searchQuery = 'test';
    component.performSearch();

    expect(unsplashService.searchImages).toHaveBeenCalledWith('test', 1);
    expect(component.images).toEqual(mockImages);
  });

  it('should handle error in performSearch', () => {
    unsplashService.searchImages.and.returnValue(throwError(() => new Error('Error during search')));

    component.searchQuery = 'test';
    component.performSearch();

    expect(component.errorMessage).toBe('Error during search');
  });

  it('should reset page number, update title, and perform search on onSearch', fakeAsync(() => {
    spyOn(localStorage, 'setItem');
    spyOn(titleService, 'setTitle');
    spyOn(component, 'performSearch');
  
    component.searchQuery = 'new query';
    component.onSearch();
  
    expect(localStorage.setItem).toHaveBeenCalledWith('lastSearchQuery', 'new query');
    expect(titleService.setTitle).toHaveBeenCalledWith('Search for "new query" - GBTEC Image Search Page');
    expect(component.pageNumber).toBe(1);
    expect(component.performSearch).toHaveBeenCalled();
  }));


  it('should load more content when loadMoreContent is called', fakeAsync(() => {
    component.loadingMoreContent = false;
    component.searchQuery = 'query';
    component.pageNumber = 1;
  
    const mockImages: UnsplashImage[] = [
      {
        id: '1',
        urls: {
          small: 'http://example.com/small/1',
          
          regular: 'http://example.com/large/1'
        },
        description: 'Description for image 1',
        
        
      },
      {
        id: '2',
        urls: {
          small: 'http://example.com/small/2',
          regular: 'http://example.com/medium/2',
          
        },
        description: 'Description for image 2',
        
        
      }
      
    ];
    unsplashService.searchImages.and.returnValue(of(mockImages));
  
    component.loadMoreContent();
    tick(300); // Simulate delay
  
    expect(component.pageNumber).toBe(2);
    expect(component.loadingMoreContent).toBeFalse();
    expect(component.images).toEqual(mockImages);
  }));

  it('should navigate to details page on onImageClick', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    
    const imageId = '123';
    component.onImageClick(imageId);
    
    expect(router.navigate).toHaveBeenCalledWith(['/details', imageId]);
  });

});
