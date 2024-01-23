import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { HttpTableComponent } from './http-table/http-table.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login | Bugtracker'
    },
    {
        path: 'signup',
        component: SignUpComponent,
        title: 'Sign up | Bugtracker'
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                title: 'Bugtracker',
                component: MyDashboardComponent
            },
            {
                path: 'projects',
                title: 'Projects | Bugtracker',
                component: ProjectsComponent
            },
            {
                path: 'http',
                title: 'HttpTable | Bugtracker',
                component: HttpTableComponent
            },
        ]
    },
    // { path: '', redirectTo: '/', pathMatch: 'full', title: 'Home | Bugtracker' },
    { path: '**', component: PageNotFoundComponent }
];
