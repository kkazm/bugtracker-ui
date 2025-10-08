import {Component, inject, Injector, signal} from '@angular/core';
import {ThemeManager} from '../theme-manager';
import {RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  readonly title = signal('bugtracker-ui');
  private injector = inject(Injector);
  themeManager = inject(ThemeManager);
}
