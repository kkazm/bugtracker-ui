import { Routes } from '@angular/router';
import {Main} from './main/main';
import {SpringIssues} from './spring-issues/spring-issues';
import {Hello} from './hello/hello';

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
    path: 'hello',
    component: Hello
  },
];
