import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES,
          ),
      },
      {
        path: 'shipments',
        loadChildren: () =>
          import('./features/shipments/shipments.routes').then(
            (m) => m.SHIPMENTS_ROUTES,
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./features/orders/orders.routes').then(
            (m) => m.ORDERS_ROUTES,
          ),
      },
      {
        path: 'channel-orders',
        loadChildren: () =>
          import('./features/channel-orders/channel-orders.routes').then(
            (m) => m.CHANNEL_ORDERS_ROUTES,
          ),
      },
      {
        path: 'hubs',
        loadChildren: () =>
          import('./features/hubs/hubs.routes').then((m) => m.HUBS_ROUTES),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.routes').then((m) => m.USERS_ROUTES),
      },
      {
        path: 'pricing',
        loadChildren: () =>
          import('./features/pricing/pricing.routes').then(
            (m) => m.PRICING_ROUTES,
          ),
      },
      {
        path: 'config',
        loadChildren: () =>
          import('./features/config/config.routes').then(
            (m) => m.configRoutes,
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
