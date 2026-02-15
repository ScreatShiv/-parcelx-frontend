import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  icon?: string;
  route: string;
}

@Component({
  standalone: true,
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, NgForOf, NgIf],
})
export class AdminSidebarComponent {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Shipments', icon: 'pi pi-send', route: '/shipments' },
    { label: 'Hubs', icon: 'pi pi-map', route: '/hubs' },
    { label: 'Users', icon: 'pi pi-users', route: '/users' },
    { label: 'Pricing', icon: 'pi pi-dollar', route: '/pricing' },
  ];
}
