import { CommonModule } from '@angular/common';
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
import { AuthenticationService } from '../authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
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
  accountCreationError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
  }

  onSubmit() {
    this.authenticationService.signUp(this.signUpForm.getRawValue())
      .subscribe({
        next: (data) => {
          console.log('Account created successfully')
          data.body?.token ? localStorage.setItem('authnToken', data.body?.token) : null;
          let snackBar = this.snackBar.open('Account created successfully', 'Close', { duration: 5000, });
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log('ACCOUNT CREATION FAILED')
          // this.accountCreationError = err.message;
          this.accountCreationError = true;
          this.signUpForm.setErrors({ notUnique: true }) // TODO Weird but works
          console.error(err.message);
        }
      });
  }

  makeFormInvalid() {
    this.signUpForm.setErrors({ 'invalid': true })
  }

}
