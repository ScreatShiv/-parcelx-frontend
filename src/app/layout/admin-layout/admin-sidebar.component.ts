import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../services/sidebar';


interface NavItem {
  label: string;
  icon: string;
  route?: string;
  section: 'main' | 'secondary';
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
 private readonly sidebarService = inject(Sidebar);

  // Desktop hover state
  isExpanded = false;

  // Mobile open state (driven by header toggle)
  readonly mobileOpen = this.sidebarService.mobileOpen;
  constructor(private sidebar:Sidebar) {}  

  closeMobile() {
    this.sidebarService.close();
  }

  private readonly navItems: NavItem[] = [
    { label: 'Dashboard',        icon: 'pi pi-th-large',     route: '/dashboard',        section: 'main' },
    { label: 'Add Orders',       icon: 'pi pi-plus-circle',  route: '/orders/add',       section: 'main' },
    { label: 'Shipments',        icon: 'pi pi-inbox',        route: '/shipments',        section: 'main' },
    { label: 'Channel Orders',   icon: 'pi pi-link',         route: '/orders/channel',   section: 'main' },
    { label: 'Wallet',           icon: 'pi pi-wallet',       route: '/wallet',           section: 'main' },
    { label: 'NDR',              icon: 'pi pi-refresh',      route: '/ndr',              section: 'main' },
    { label: 'Reports',          icon: 'pi pi-chart-bar',    route: '/reports',          section: 'main' },
    { label: 'Billing',          icon: 'pi pi-credit-card',  route: '/billing',          section: 'main' },
    { label: 'Custom Tracking',  icon: 'pi pi-book',         route: '/custom-tracking',  section: 'main' },
    { label: 'Communication',    icon: 'pi pi-comments',     route: '/communication',    section: 'main' },
    { label: 'Tickets',          icon: 'pi pi-ticket',       route: '/tickets',          section: 'main' },
    { label: 'Utilities',        icon: 'pi pi-calculator',   route: '/utilities',        section: 'secondary' },
    { label: 'Help & Support',   icon: 'pi pi-headphones',   route: '/help',             section: 'secondary' },
    { label: 'Settings',         icon: 'pi pi-cog',          route: '/settings',         section: 'secondary' },
  ];

  readonly mainNavItems      = this.navItems.filter((item) => item.section === 'main');
  readonly secondaryNavItems = this.navItems.filter((item) => item.section === 'secondary');
}
