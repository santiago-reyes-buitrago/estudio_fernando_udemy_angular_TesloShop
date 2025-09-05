import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '@auth/services/auth.service';

@Component({
  selector: 'app-register',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  hasError = signal<boolean>(false);
  isPosting = signal<boolean>(false);


  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]],
    fullName: ['', [Validators.required, Validators.minLength(10)]],
  });

  onsubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      },2000)
      return;
    }
    const {email="",password="",fullName=""} = this.registerForm.value;
    this.authService.register({email:email!, password:password!,fullName:fullName!}).subscribe({
      next: value => {
        if (value) {
          this.router.navigateByUrl('/');
          return;
        }
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        },2000)
      }
    })
  }
}
