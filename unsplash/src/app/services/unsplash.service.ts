import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { UnsplashImage } from '../interfaces/unsplash-image.interface'; // Assuming this interface exists

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private baseUrl = 'https://api.unsplash.com';
  private apiKey = environment.unsplashApiKey;

  constructor(private http: HttpClient) { }

  public searchImages(query: string, page: number = 1): Observable<UnsplashImage[]> {
    const perPage = 10;
    const url = `${this.baseUrl}/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => response.results),
      catchError(this.handleError)
    );
  }

  public getImageDetails(imageId: string): Observable<any> {
    const url = `${this.baseUrl}/photos/${imageId}?client_id=${this.apiKey}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code, possibly rate-limiting
      if (error.status === 429 || error.status === 403) {
        errorMessage = `API rate limit exceeded or access forbidden: ${error.status}`;
      } else {
        errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
