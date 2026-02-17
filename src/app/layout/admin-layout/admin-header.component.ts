import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../core/auth';
import { Sidebar } from '../../services/sidebar';

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
  private readonly sidebarService = inject(Sidebar);

  get userInitials(): string {
    const user = this.auth.currentUser;
    if (!user) {
      return 'GS';
    }
    if (user.name) {
      const parts = user.name.trim().split(/\s+/);
      const first = parts[0]?.[0] ?? '';
      const last = parts[parts.length - 1]?.[0] ?? '';
      const initials = (first + last).trim();
      if (initials.length > 0) {
        return initials.toUpperCase();
      }
    }

    const localPart = user.email.split('@')[0];
    const letters = localPart.replace(/[^a-zA-Z]/g, '');
    if (letters.length >= 2) {
      return (letters[0] + letters[1]).toUpperCase();
    }
    if (letters.length === 1) {
      return letters[0].toUpperCase();
    }
    return localPart.slice(0, 2).toUpperCase();
  }

  logout(): void {
    this.auth.clearSession();
    this.router.navigate(['/auth/login']);
  }

  toggleMobileSidebar(): void {
    this.sidebarService.toggle();
  }
}
