import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-page',
    imports: [],
    templateUrl: './user-page.component.html',
    styleUrl: './user-page.component.scss'
})
export class UserPageComponent {

  userId: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.warn("User ID: " + this.userId);
      // Now you can use this.projectId to fetch the project based on the ID
    });
  }

}
