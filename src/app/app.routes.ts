import { Routes } from '@angular/router';
import {Main} from './main/main';
import {DynamicContentDemo} from './dynamic-content-demo/dynamic-content-demo';
import {SpringIssues} from './spring-issues/spring-issues';

export const routes: Routes = [
  {
    path: '',
    component: Main
  },
  {
    path: 'dynamicContent',
    component: DynamicContentDemo
  },
  {
    path: 'spring-issues',
    component: SpringIssues
  },
];
