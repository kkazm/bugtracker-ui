import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-project-page',
    templateUrl: './project-page.component.html',
    styleUrl: './project-page.component.scss',
    imports: [
        MatSidenavModule,
        MatButtonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        MatTooltipModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        AsyncPipe,
        CommonModule,
    ]
})
export class ProjectPageComponent implements OnInit {

  projectId: number = 0;
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      console.warn("Project ID: " + this.projectId);
      // Now you can use this.projectId to fetch the project based on the ID
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
