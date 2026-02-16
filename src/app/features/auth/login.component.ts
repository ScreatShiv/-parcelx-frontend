import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Auth } from '../../core/auth';
import { AuthApiService, LoginRequest } from '../../services/auth-api.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authApi = inject(AuthApiService);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isSubmitting = false;
  submitError: string | null = null;

  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;

    const value = this.form.getRawValue() as LoginRequest;

    this.authApi.login(value).subscribe({
      next: (response) => {
        this.auth.setSession(response.accessToken, response.user);
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'Invalid credentials. Please try again.';
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
