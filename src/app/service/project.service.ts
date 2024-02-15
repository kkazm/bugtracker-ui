import { HttpClient, HttpContextToken } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProjectsTableItem } from '../main/projects-table/projects-table-datasource';
import { ConfigService } from './config.service';
import { Page } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private configService = inject(ConfigService);

  constructor(
    private http: HttpClient
  ) { }

  createProject(projectName: string) {
    return this.http.post<{ id: number, name: string }>(this.configService.apiUrl + '/projects', { projectName: projectName });
  }

  getAllPublicProjects(page: number, per_page: number, sort: string, direction: string) {
    return this.http.get<Page<any>>(
      `${this.configService.apiUrl}/projects?page=${page}&per_page=${per_page}&sort=${sort}&direction=${direction}`
    )
  }

}
