import { Routes } from '@angular/router';
import {Main} from './main/main';
import {SpringIssues} from './spring-issues/spring-issues';
import TaigaDash from './taiga-dash/taiga-dash';

export const routes: Routes = [
  {
    path: '',
    component: Main
  },
  {
    path: 'spring-issues',
    component: SpringIssues
  },
  {
    path: 'taiga',
    component: TaigaDash
  }
];
