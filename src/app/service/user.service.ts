import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Page } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  getAllUsers(page: number, per_page: number, sort: string, direction: string) {
    return this.http.get<Page<any>>(
      `${this.configService.apiUrl}/users?page=${page}&per_page=${per_page}&sort=${sort}&direction=${direction}`
    )
  }

}
