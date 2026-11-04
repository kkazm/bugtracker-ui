import { ResolveFn, Routes } from '@angular/router';
import Main from './main/main';
import NotFound from './not-found/not-found';
import PlaceholderFull from './placeholder-full/placeholder-full';

const userPageTitleResolver: ResolveFn<string> = (route) => route.queryParams['id']; // TODO

export const routes: Routes = [
  {
    path: '',
    title: 'Bugtracker Home',
    component: Main,
    children: [
      {
        path: '',
        loadComponent: () => import('./placeholder-main/placeholder-main'),
        title: 'Main',
      },
    ],
  },
  {
    path: 'placeholder',
    title: 'Placeholder Bugtracker Home',
    component: PlaceholderFull,
    children: [
      {
        path: '',
        loadComponent: () => import('./placeholder-main/placeholder-main'),
        title: 'Placeholder Main',
      },
    ],
  },
  {
    path: '**',
    title: 'Bugtracker Page not found',
    component: NotFound,
  },
];
