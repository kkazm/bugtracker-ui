import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  imports: [
    TuiButton
  ],
  selector: 'app-not-found',
  styleUrl: './not-found.scss',
  templateUrl: './not-found.html',
})
export default class NotFound {
  protected router = inject(Router);
}
