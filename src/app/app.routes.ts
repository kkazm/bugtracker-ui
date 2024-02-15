import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyDashboardComponent } from './main/my-dashboard/my-dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersTableComponent } from './main/users-table/users-table.component';
import { ProjectsTableComponent } from './main/projects-table/projects-table.component';
import { ProjectPageComponent } from './main/project-page/project-page.component';
import { UserPageComponent } from './main/user-page/user-page.component';

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
                component: ProjectsTableComponent
            },
            {
                path: 'projects/:id',
                component: ProjectPageComponent,
                title: 'Project view | Bugtracker'
            },
            {
                path: 'users',
                title: 'Users | Bugtracker',
                component: UsersTableComponent
            },
            {
                path: 'users/:id',
                component: UserPageComponent,
                title: 'User :id | Bugtracker'
            },
        ]
    },
    // { path: '', redirectTo: '/', pathMatch: 'full', title: 'Home | Bugtracker' },
    { path: '**', component: PageNotFoundComponent }
];
