import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

export interface LoginCredentials {
  username: string,
  password: string,
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private jwt$ = new BehaviorSubject<string>('');
  private readonly baseUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  login(loginCredentials: LoginCredentials): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.baseUrl + '/login', loginCredentials);
  }

  logout(): void {
    localStorage.removeItem('authnToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authnToken');
  }

  signUp(loginCredentials: LoginCredentials): Observable<HttpResponse<{ token: string }>> {
    return this.http.post<{ token: string }>(
      this.baseUrl + '/signup', loginCredentials, { observe: 'response' }
    )
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(error.error.message));
    // return of(error);
  }

}
