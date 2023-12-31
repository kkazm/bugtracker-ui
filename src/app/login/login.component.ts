import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
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
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.fb.array([this.fb.control('')])
  });

  loginForm = this.fb.nonNullable.group({
    username: ['', { validators: [Validators.required, Validators.minLength(3)] }],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // TODO Use .value instead of .getRawValue()
    this.authenticationService.login(this.loginForm.getRawValue())
      .subscribe({
        next: (data) => {
          localStorage.setItem('authnToken', data.token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          // TODO Handle error
          console.error(err);
        }
      })
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

}
