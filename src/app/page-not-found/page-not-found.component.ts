import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-page-not-found',
    imports: [
        MatButtonModule,
        RouterLink,
    ],
    templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent {

}
