import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../core/auth';

@Component({
  standalone: true,
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.clearSession();
    this.router.navigate(['/auth/login']);
  }
}
