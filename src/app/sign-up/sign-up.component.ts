import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  signUpForm = this.fb.nonNullable.group({
    username: ['', { validators: [Validators.required, Validators.minLength(3)] }],
    password: ['', Validators.required]
  });
  accountCreationError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
  }

  onSubmit() {
    this.accountCreationError = '';
    this.authenticationService.signUp(this.signUpForm.getRawValue())
      .subscribe({
        next: (data) => {
          data.body?.token ? this.authenticationService.setAuthToken(data.body.token) : null;
          const snackBar = this.snackBar.open('Account created successfully', 'Close', { duration: 4000, });
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log("Type of error is " + AppComponent.myGetType(err));
          console.log('ACCOUNT CREATION FAILED')
          console.log(err.message + " ERROR " + err.status);
          switch (err.status) {
            case 409:
              this.accountCreationError = 'Username taken'
              break;
            default:
              this.accountCreationError = 'Something went wrong, please try again later.';
              break;
          }
        }
      });
  }

  makeFormInvalid() {
    this.signUpForm.setErrors({ 'invalid': true }) // TODO Delete
  }

}
