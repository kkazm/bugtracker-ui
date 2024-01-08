import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
