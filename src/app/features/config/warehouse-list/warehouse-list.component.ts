import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CustomTableComponent, CustomTableColumn } from '../../../shared/shipments-table/shipments-table.component';
import { AddWarehouseComponent } from '../add-warehouse/add-warehouse.component';

export interface Warehouse {
  id: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CustomTableComponent,
    AddWarehouseComponent
  ],
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseListComponent implements OnInit {
  displayAddModal = false;

  columns: CustomTableColumn[] = [
    { key: 'id', label: 'ID', width: '100px' },
    { key: 'businessName', label: 'Business Name', width: '200px' },
    { key: 'contactPerson', label: 'Contact Person', width: '180px' },
    { key: 'phone', label: 'Phone', width: '150px' },
    { key: 'address', label: 'Address', width: '300px' },
    { key: 'action', label: 'Action', width: '150px' },
  ];

  warehouses: Warehouse[] = [
    {
      id: 'WH001',
      businessName: 'Main Warehouse',
      contactPerson: 'John Doe',
      phone: '9876543210',
      address: '123, Industrial Area, Sector 5, Bangalore - 560001',
    },
    {
      id: 'WH002',
      businessName: 'Secondary Warehouse',
      contactPerson: 'Jane Smith',
      phone: '8765432109',
      address: '456, Logistics Park, Outer Ring Road, Hyderabad - 500032',
    },
  ];

  ngOnInit(): void {}

  showAddWarehouse(): void {
    this.displayAddModal = true;
  }

  onSaveWarehouse(warehouse: any): void {
    console.log('Saving warehouse:', warehouse);
    this.displayAddModal = false;
  }

  onCancel(): void {
    this.displayAddModal = false;
  }

  onDelete(warehouse: Warehouse): void {
    console.log('Deleting warehouse:', warehouse);
  }

  onEdit(warehouse: Warehouse): void {
    console.log('Editing warehouse:', warehouse);
  }

  onView(warehouse: Warehouse): void {
    console.log('Viewing warehouse:', warehouse);
  }
}
