import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Auth } from '../../core/auth';
import { AuthApiService, LoginRequest } from '../../services/auth-api.service';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, ToastModule],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authApi = inject(AuthApiService);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isSubmitting = false;

  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const value = this.form.getRawValue() as LoginRequest;

    this.authApi.login(value).subscribe({
      next: (response) => {
        const token = response.data?.access_token;
        const user = response.data?.user;

        if (!token || !user) {
           this.messageService.add({
             severity: 'error',
             summary: 'Error',
             detail: 'Authentication failed: Invalid response format.',
           });
           this.isSubmitting = false;
           return;
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful',
        });

        this.auth.setSession(token, user);
        
        // Use a small delay to ensure the toast is visible before navigation
        // and to allow state updates to propagate
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 500);
      },
      error: (error) => {
        this.isSubmitting = false;
        const errorMessage = error?.error?.message || 'Invalid credentials. Please try again.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
