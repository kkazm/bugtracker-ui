import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../app.component';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getAllProjectIssues(projectId: number, page: number, per_page: number, sort: string, direction: string) {
    return this.http.get<Page<any>>(
      `${this.configService.apiUrl}/projects/${projectId}/issues?page=${page}&size=${per_page}&sort=${sort}&direction=${direction}`
    )
  }

}
