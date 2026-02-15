import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { ShipmentsFacade } from './shipments.facade';
import { ShipmentStatus } from '../../models/shipment.model';

@Component({
  standalone: true,
  selector: 'app-shipments-list',
  templateUrl: './shipments-list.component.html',
  styleUrl: './shipments-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, TableModule, SelectModule],
})
export class ShipmentsListComponent implements OnInit {
  private readonly facade = inject(ShipmentsFacade);
  readonly vm = this.facade.vm;

  readonly statusOptions: { label: string; value: ShipmentStatus | null }[] = [
    { label: 'All', value: null },
    { label: 'Pending', value: 'PENDING' },
    { label: 'In transit', value: 'IN_TRANSIT' },
    { label: 'Delivered', value: 'DELIVERED' },
    { label: 'Cancelled', value: 'CANCELLED' },
  ];

  selectedStatus: ShipmentStatus | null = null;

  ngOnInit(): void {
    this.facade.loadShipments();
  }

  onLazyLoad(event: any): void {
    const first = event?.first ?? 0;
    const rows = event?.rows ?? 10;
    const page = first / rows;
    const size = rows;
    const sortField = event.sortField ?? null;
    const sortOrder = event.sortOrder ?? 0;

    this.facade.changePage(page, size);

    if (sortField !== null) {
      const mappedSortOrder: 1 | -1 | 0 =
        sortOrder === 1 ? 1 : sortOrder === -1 ? -1 : 0;
      this.facade.changeSort(sortField, mappedSortOrder);
    }
  }

  onStatusChange(): void {
    this.facade.changeStatusFilter(this.selectedStatus);
  }
}
