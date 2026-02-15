import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
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
    ],
  },
];
