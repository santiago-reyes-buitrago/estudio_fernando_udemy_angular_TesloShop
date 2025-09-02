import {Component, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  hasError = signal<boolean>(false);
  isPosting = signal<boolean>(false);


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]]
  });

  onsubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      },2000)
      return;
    }
    const {email="",password=""} = this.loginForm.value;
    this.authService.login(email!,password!).subscribe({
      next: value => {
        console.log(value);
      }
    })
  }
}
