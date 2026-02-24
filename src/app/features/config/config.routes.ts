import { Routes } from '@angular/router';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';

export const configRoutes: Routes = [
  {
    path: 'warehouses',
    component: WarehouseListComponent,
    title: 'Warehouse Management'
  },
  {
    path: '',
    redirectTo: 'warehouses',
    pathMatch: 'full'
  }
];
