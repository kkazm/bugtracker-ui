import { Routes } from '@angular/router';
import {MainOld} from './main-old/main-old.component';
import {SpringIssues} from './spring-issues/spring-issues';
import Main from './main/main';

export const routes: Routes = [
  {
    path: '',
    component: Main
  },
  {
    path: 'main',
    component: MainOld
  },
  {
    path: 'spring-issues',
    component: SpringIssues
  },
];
