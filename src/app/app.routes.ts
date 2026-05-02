import { Routes } from '@angular/router';
import {Main} from './main/main';
import {SpringIssues} from './spring-issues/spring-issues';

export const routes: Routes = [
  {
    path: '',
    component: Main
  },
  {
    path: 'spring-issues',
    component: SpringIssues
  }
];
