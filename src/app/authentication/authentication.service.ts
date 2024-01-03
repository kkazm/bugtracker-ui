import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  login(loginCredentials: LoginCredentials) {
    this.http
      .post<{ token: string }>(this.baseUrl + '/login', loginCredentials)
      .subscribe({
        next: (data) => {
          localStorage.setItem('authnToken', data.token);
        },
        error: (err) => {
          // TODO Handle error
          console.error(err);
        }
      });
  }

}
