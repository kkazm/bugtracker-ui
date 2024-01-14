import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login | Bugtracker'
    },
    {
        path: '',
        component: MainComponent,
        children: [{
            path: 'projects',
            title: 'Projects | Bugtracker',
            component: ProjectsComponent
        },
        {
            path: '',
            title: 'Bugtracker',
            component: MyDashboardComponent
        }
        ]
    },
    // { path: '', redirectTo: '/', pathMatch: 'full', title: 'Home | Bugtracker' },
    { path: '**', component: PageNotFoundComponent }
];
