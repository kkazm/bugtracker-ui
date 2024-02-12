import { HttpClient, HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly baseUrl = 'http://localhost:8080'

  constructor(
    private http: HttpClient
  ) { }

  createProject(projectName: string) {
    return this.http.post(this.baseUrl + '/project', { projectName: projectName });
  }

}
