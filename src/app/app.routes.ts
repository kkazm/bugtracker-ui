import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login | Bugtracker'
    },
    {
        path: '',
        component: MainComponent,
        title: 'Bugtracker',
        children: [{
            path: '',
            component: ProjectsComponent
        }]
    },
    // { path: '', redirectTo: '/', pathMatch: 'full', title: 'Home | Bugtracker' },
    { path: '**', component: PageNotFoundComponent }
];
