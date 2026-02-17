import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Sidebar {
  readonly mobileOpen = signal(false);

  toggle() {
    this.mobileOpen.update((v) => !v);
  }

  close() {
    this.mobileOpen.set(false);
  }
}
