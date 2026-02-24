import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject } from '@angular/core';
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
  private readonly el = inject(ElementRef);
  userMenuOpen = false;
  private readonly sidebarService = inject(Sidebar);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.userMenuOpen = false;
    }
  }

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

  get userName(): string {
    const user = this.auth.currentUser;
    if (user?.name) {
      return user.name.toUpperCase();
    }
    if (user?.email) {
      return user.email.split('@')[0].toUpperCase();
    }
    return 'USER';
  }

  get userEmail(): string {
    return this.auth.currentUser?.email ?? '';
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  confirmLogoutOpen = false;

  requestLogout(): void {
    this.confirmLogoutOpen = true;
    this.userMenuOpen = false;
  }

  cancelLogout(): void {
    this.confirmLogoutOpen = false;
  }

  logout(): void {
    this.auth.clearSession();
    this.userMenuOpen = false;
    this.confirmLogoutOpen = false;
    this.router.navigate(['/auth/login']);
  }


  toggleMobileSidebar(): void {
    this.sidebarService.toggle();
  }
}
