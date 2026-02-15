import { Injectable, signal } from '@angular/core';
import { AuthUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly tokenSignal = signal<string | null>(null);
  private readonly userSignal = signal<AuthUser | null>(null);

  constructor() {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.tokenSignal.set(storedToken);
    }
  }

  setSession(token: string, user: AuthUser): void {
    localStorage.setItem('token', token);
    this.tokenSignal.set(token);
    this.userSignal.set(user);
  }

  clearSession(): void {
    localStorage.removeItem('token');
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  getAccessToken(): string | null {
    return this.tokenSignal();
  }

  isAuthenticated(): boolean {
    return !!this.tokenSignal();
  }

  get currentUser(): AuthUser | null {
    return this.userSignal();
  }
}
