import { Injectable, computed, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ShipmentApiService, ShipmentQuery } from '../../services/shipment-api.service';
import { Shipment, ShipmentStatus } from '../../models/shipment.model';

interface ShipmentsState {
  items: Shipment[];
  total: number;
  loading: boolean;
  page: number;
  size: number;
  sortField: string | null;
  sortOrder: 1 | -1 | 0;
  status: ShipmentStatus | null;
}

@Injectable({
  providedIn: 'root',
})
export class ShipmentsFacade {
  private readonly state = signal<ShipmentsState>({
    items: [],
    total: 0,
    loading: false,
    page: 0,
    size: 10,
    sortField: 'createdAt',
    sortOrder: -1,
    status: null,
  });

  readonly vm = computed(() => this.state());

  constructor(private readonly api: ShipmentApiService) {}

  loadShipments(): void {
    const snapshot = this.state();
    const query: ShipmentQuery = {
      page: snapshot.page,
      size: snapshot.size,
      sortField: snapshot.sortField,
      sortOrder: snapshot.sortOrder,
      status: snapshot.status,
    };

    this.state.update((current) => ({ ...current, loading: true }));

    this.api
      .findShipments(query)
      .pipe(
        finalize(() => {
          this.state.update((current) => ({ ...current, loading: false }));
        }),
      )
      .subscribe((result) => {
        this.state.update((current) => ({
          ...current,
          items: result.items,
          total: result.total,
        }));
      });
  }

  changePage(page: number, size: number): void {
    this.state.update((current) => ({
      ...current,
      page,
      size,
    }));
    this.loadShipments();
  }

  changeSort(sortField: string, sortOrder: 1 | -1 | 0): void {
    this.state.update((current) => ({
      ...current,
      sortField,
      sortOrder,
    }));
    this.loadShipments();
  }

  changeStatusFilter(status: ShipmentStatus | null): void {
    this.state.update((current) => ({
      ...current,
      status,
      page: 0,
    }));
    this.loadShipments();
  }
}

