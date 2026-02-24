import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ShipmentsFacade } from './shipments.facade';
import { Shipment, ShipmentStatus } from '../../models/shipment.model';
import {
  DateRangeComponent,
  DateRangeValue,
} from '../../shared/date-range/date-range.component';
import {
  CustomTableComponent,
  CustomTableColumn,
} from '../../shared/shipments-table/shipments-table.component';

@Component({
  standalone: true,
  selector: 'app-shipments-list',
  templateUrl: './shipments-list.component.html',
  styleUrl: './shipments-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, TableModule, DateRangeComponent, CustomTableComponent],
})
export class ShipmentsListComponent implements OnInit {
  private readonly facade = inject(ShipmentsFacade);
  readonly vm = this.facade.vm;

  readonly forwardStatusTabs: { label: string; value: ShipmentStatus | null }[] =
    [
      { label: 'Not Picked', value: 'NOT_PICKED' },
      { label: 'In Transit', value: 'IN_TRANSIT' },
      { label: 'Out for Delivery', value: 'OUT_FOR_DELIVERY' },
      { label: 'Delivered', value: 'DELIVERED' },
      { label: 'NDR', value: 'NDR' },
      { label: 'Return', value: 'RETURN' },
      { label: 'Cancelled', value: 'CANCELLED' },
      { label: 'On Process', value: 'ON_PROCESS' },
      { label: 'Draft Orders', value: 'DRAFT' },
      { label: 'All Orders', value: null },
    ];

  readonly reverseStatusTabs: { label: string; value: ShipmentStatus | null }[] =
    [
      { label: 'Not Picked', value: 'NOT_PICKED' },
      { label: 'In Transit', value: 'IN_TRANSIT' },
      { label: 'Out for Delivery', value: 'OUT_FOR_DELIVERY' },
      { label: 'Delivered', value: 'DELIVERED' },
      { label: 'NDR', value: 'NDR' },
      { label: 'Return', value: 'RETURN' },
      { label: 'Cancelled', value: 'CANCELLED' },
      { label: 'All Orders', value: null },
    ];

  selectedStatus: ShipmentStatus | null = null;
  direction: 'FORWARD' | 'REVERSE' = 'FORWARD';
  viewType: 'PROCESSED' | 'FAILED' = 'PROCESSED';
  showFilters = true;

  dateType = 'PLACED_DATE';
  fromDate: string | null = null;
  toDate: string | null = null;
  searchType = 'TRACKING';
  searchText = '';
  expressType: string | null = null;
  minOrderValue: number | null = null;
  maxOrderValue: number | null = null;
  zone: string | null = null;

  readonly failedForwardColumns: CustomTableColumn[] = [
    { key: 'orderDetails', label: 'Order Details', width: '180px' },
    { key: 'invoice', label: 'Invoice/Ref No.', width: '140px' },
    { key: 'product', label: 'Product Details', width: '140px' },
    { key: 'amount', label: 'Amount Details', width: '120px' },
    { key: 'pickup', label: 'Pickup Address', width: '160px' },
    { key: 'consignee', label: 'Consignee Address', width: '200px' },
    { key: 'userContact', label: 'User Contact', width: '120px' },
    { key: 'weight', label: 'Weight Details', width: '140px' },
    { key: 'others', label: 'Others', width: '140px' },
    { key: 'failureReason', label: 'Failure Reason', width: '180px' },
    { key: 'reorder', label: 'Re-Order', width: '100px' },
  ];

  readonly failedForwardOrders: Shipment[] = [
    {
      id: '10652277',
      trackingNumber: '13630071220001',
      originHub: 'Zirakpur',
      destinationHub: 'Port Blair',
      status: 'NOT_PICKED',
      createdAt: '2026-02-17T13:24:00Z',
      updatedAt: '2026-02-17T13:24:00Z',
      invoiceRef: 'PMR864277',
      productDetails: 'MEDICINE QTY: 1',
      amountDetails: '762240.00',
      pickupAddress: 'Warehouse-ID: 70026 - Zirakpur, 160104',
      consigneeAddress:
        'MISSION DIRECTOR, A&N UNION TERRITORY HEALTH MISSION, ATLANTA POINT, Port Blair - 744103',
      userContact: '9876025653',
      weightDetails: 'Wt(kg): 5.00 | L: 100 | W: 100 | H: 100',
      otherDetails: 'Type: Forward | MPS: No | NDR: No | SDD: No',
      failureReason: 'Pincode is not serviceable by Delivery',
      carrier: 'Delivery',
    },
    {
      id: '10652278',
      trackingNumber: '13630071220002',
      originHub: 'Zirakpur',
      destinationHub: 'Port Blair',
      status: 'NOT_PICKED',
      createdAt: '2026-02-17T13:24:00Z',
      updatedAt: '2026-02-17T13:24:00Z',
      invoiceRef: 'APK4WT-500',
      productDetails: 'MEDICINE QTY: 2',
      amountDetails: '165000.00',
      pickupAddress: 'Warehouse-ID: 70026 - Zirakpur, 160104',
      consigneeAddress:
        'AKASH PHARMACY, NEAR HANUMAN ROAD, WARD-03, BIDADI, Bengaluru - 560090',
      userContact: '9876025000',
      weightDetails: 'Wt(kg): 3.00 | L: 50 | W: 40 | H: 30',
      otherDetails: 'Type: Forward | MPS: No | NDR: No | SDD: Yes',
      failureReason: 'COD Orders are not allowed - DTDC',
      carrier: 'Delivery',
    },
    {
      id: '10652279',
      trackingNumber: '13630071220003',
      originHub: 'Zirakpur',
      destinationHub: 'Port Blair',
      status: 'NOT_PICKED',
      createdAt: '2026-02-17T13:24:00Z',
      updatedAt: '2026-02-17T13:24:00Z',
      invoiceRef: 'APK4WT-501',
      productDetails: 'MEDICINE QTY: 1',
      amountDetails: '58000.00',
      pickupAddress: 'Warehouse-ID: 70026 - Zirakpur, 160104',
      consigneeAddress:
        'AKASH PHARMACY, NEAR HANUMAN ROAD, WARD-03, BIDADI, Bengaluru - 560090',
      userContact: '9876025001',
      weightDetails: 'Wt(kg): 2.00 | L: 40 | W: 30 | H: 25',
      otherDetails: 'Type: Forward | MPS: No | NDR: No | SDD: No',
      failureReason: 'Pincode is not serviceable by Delivery B2B',
      carrier: 'Delivery',
    },
  ];

  get visibleStatusTabs(): { label: string; value: ShipmentStatus | null }[] {
    return this.direction === 'REVERSE'
      ? this.reverseStatusTabs
      : this.forwardStatusTabs;
  }

  readonly baseColumns: CustomTableColumn[] = [
    { key: 'orderDetails', label: 'Order Details', width: '200px' },
    { key: 'tracking', label: 'Tracking Details', width: '160px' },
    { key: 'invoice', label: 'Invoice/Ref No.', width: '140px' },
    { key: 'product', label: 'Product Details', width: '160px' },
    { key: 'amount', label: 'Amount Details', width: '120px' },
    { key: 'pickup', label: 'Pickup Address', width: '160px' },
    { key: 'consignee', label: 'Consignee Address', width: '200px' },
    { key: 'userContact', label: 'User Contact', width: '120px' },
    { key: 'status', label: 'Status', width: '120px' },
  ];

  get visibleColumns(): CustomTableColumn[] {
    if (this.viewType === 'FAILED' && this.direction === 'FORWARD') {
      return this.failedForwardColumns;
    }
    return this.baseColumns;
  }

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

  selectStatusTab(status: ShipmentStatus | null): void {
    this.selectedStatus = status;
    this.onStatusChange();
  }

  setDirection(direction: 'FORWARD' | 'REVERSE'): void {
    this.direction = direction;
     const firstTab = this.visibleStatusTabs[0] ?? null;
     this.selectedStatus = firstTab ? firstTab.value : null;
     this.onStatusChange();
  }

  setViewType(viewType: 'PROCESSED' | 'FAILED'): void {
    this.viewType = viewType;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onDateRangeApply(range: DateRangeValue): void {
    this.fromDate = range.from ? range.from.toISOString() : null;
    this.toDate = range.to ? range.to.toISOString() : null;
  }

  onSearch(): void {
    this.facade.applyFilters({
      dateType: this.dateType,
      fromDate: this.fromDate,
      toDate: this.toDate,
      searchType: this.searchType,
      searchText: this.searchText ? this.searchText.trim() : '',
      expressType: this.expressType,
      minOrderValue: this.minOrderValue,
      maxOrderValue: this.maxOrderValue,
      zone: this.zone,
    });
  }

  onTablePageChange(event: { page: number; size: number }): void {
    this.facade.changePage(event.page, event.size);
  }

  resetFilters(): void {
    this.dateType = 'PLACED_DATE';
    this.fromDate = null;
    this.toDate = null;
    this.searchType = 'TRACKING';
    this.searchText = '';
    this.expressType = null;
    this.minOrderValue = null;
    this.maxOrderValue = null;
    this.zone = null;
    this.facade.applyFilters({
      dateType: this.dateType,
      fromDate: this.fromDate,
      toDate: this.toDate,
      searchType: this.searchType,
      searchText: this.searchText,
      expressType: this.expressType,
      minOrderValue: this.minOrderValue,
      maxOrderValue: this.maxOrderValue,
      zone: this.zone,
    });
  }
}
