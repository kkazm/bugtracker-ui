import { ResolveFn, Routes } from '@angular/router';
import Main from './main/main';
import NotFound from './not-found/not-found';

const userPageTitleResolver: ResolveFn<string> = (route) => route.queryParams['id']; // TODO

export const routes: Routes = [
  {
    path: '',
    title: 'Bugtracker Home',
    component: Main,
  },
  {
    path: '**',
    title: 'Bugtracker Page not found',
    component: NotFound,
  },
];
