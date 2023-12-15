import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private baseUrl = 'https://api.unsplash.com';
  private apiKey = environment.unsplashApiKey;

  constructor(private http: HttpClient) { 
   
  }

  public searchImages(query: string): Observable<any> {
    const url = `${this.baseUrl}/search/photos?query=${query}&client_id=${this.apiKey}`;
    return this.http.get(url);
  }

  // Fetches the details of a specific image using its ID
  public getImageDetails(imageId: string): Observable<any> {
    const url = `${this.baseUrl}/photos/${imageId}?client_id=${this.apiKey}`;
    return this.http.get(url);
  }
}
