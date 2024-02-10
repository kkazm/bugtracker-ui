import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Theme, ThemeManager } from '../service/theme-manager.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    CdkMenuModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './main.component.html',
})
export class MainComponent {

  theme = this.themeManager.theme;

  showMobileMenu = false;

  constructor(
    public authService: AuthenticationService,
    private themeManager: ThemeManager
  ) {
  }

  setTheme(theme: Theme) {
    this.themeManager.setTheme(theme)
  }

}
