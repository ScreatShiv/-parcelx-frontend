import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import {
  CustomTableComponent,
  CustomTableColumn
} from '../../shared/shipments-table/shipments-table.component';

import { ChannelListComponent } from './channel-list/channel-list.component';
import { AddChannelComponent } from './add-channel/add-channel.component';
import {
  DATA_TYPES,
  SEARCH_TYPES,
  ADVANCE_FILTERS,
  CHANNEL_TABS,
  STATUS_TABS,
  PROCESS_TYPE,
  BY_TAG
} from './channel-orders.constants';
import { DateRangeComponent } from '../../shared/date-range/date-range.component';

@Component({
  selector: 'app-channel-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    DatePickerModule,
    InputTextModule,
    ButtonModule,
    CustomTableComponent,
    ChannelListComponent,
    AddChannelComponent,
    DateRangeComponent
  ],
  templateUrl: './channel-orders.component.html',
  styleUrl: './channel-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelOrdersComponent implements OnInit {

  /* ---------------------------
     SIGNAL STATE (Like Shipment)
  ---------------------------- */

  private readonly state = signal({
    items: [] as any[],
    total: 0,
    loading: false,
    page: 0,
    size: 10,
    status: null as string | null
  });

  readonly vm = computed(() => this.state());

  /* ---------------------------
     UI CONFIG
  ---------------------------- */

  tabs = CHANNEL_TABS.map((tab, index) => ({
    ...tab,
    active: index === 0
  }));

  statusTabs = STATUS_TABS.map((tab, index) => ({
    ...tab,
    active: index === 0
  }));

  dateTypes = [...DATA_TYPES];
  selectedDateType = DATA_TYPES[0].value;

  searchTypes = [...SEARCH_TYPES];
  selectedSearchType = SEARCH_TYPES[0].value;

  advanceFilters = [...ADVANCE_FILTERS];
  selectedAdvanceFilter = ADVANCE_FILTERS[0].value;

  processTypes = [...PROCESS_TYPE];
  selectedTag = [...BY_TAG];
  selectedProcessType = BY_TAG[0].value;

  fromDate: string | null = null;
  toDate: string | null = null;

  columns: CustomTableColumn[] = [
    { key: 'orderDetails', label: 'Order Details' },
    { key: 'storeDetails', label: 'Store Details' },
    { key: 'productDetails', label: 'Product Details' },
    { key: 'amountDetails', label: 'Amount Details' },
    { key: 'address', label: 'Address' },
    { key: 'communications', label: 'Communications' },
    { key: 'action', label: 'Action' }
  ];

  /* ---------------------------
     MOCK DATA
  ---------------------------- */

  private readonly allMockOrders: any[] = [
    {
      id: 'CH-101',
      status: 'pending',
      orderDetails: { id: 'CH-101', date: '2026-02-25', source: 'Shopify' },
      storeDetails: { name: 'My Fashion Store', location: 'Mumbai' },
      productDetails: { name: 'Wireless Headphones', sku: 'WHP-001', qty: 1 },
      amountDetails: { total: 2499, status: 'Paid' },
      address: { consignee: 'Rahul Sharma', city: 'Mumbai', pincode: '400001' },
      communications: { email: 'sent', sms: 'sent' }
    },
    {
      id: 'CH-102',
      status: 'ready_to_ship',
      orderDetails: { id: 'CH-102', date: '2026-02-24', source: 'Amazon' },
      storeDetails: { name: 'Tech Hub', location: 'Delhi' },
      productDetails: { name: 'Smart Watch', sku: 'SW-002', qty: 2 },
      amountDetails: { total: 5998, status: 'Paid' },
      address: { consignee: 'Priya Patel', city: 'Delhi', pincode: '110001' },
      communications: { email: 'sent', sms: 'pending' }
    },
    {
      id: 'CH-103',
      status: 'reship',
      orderDetails: { id: 'CH-103', date: '2026-02-23', source: 'WooCommerce' },
      storeDetails: { name: 'Home Decor', location: 'Bangalore' },
      productDetails: { name: 'Table Lamp', sku: 'TL-003', qty: 1 },
      amountDetails: { total: 1250, status: 'COD' },
      address: { consignee: 'Amit Kumar', city: 'Bangalore', pincode: '560001' },
      communications: { email: 'failed', sms: 'none' }
    }
  ];

  /* ---------------------------
     LIFECYCLE
  ---------------------------- */

  ngOnInit(): void {
    this.loadOrders();
  }

  /* ---------------------------
     LOAD DATA
  ---------------------------- */

  private loadOrders(): void {
    const snapshot = this.state();

    let filtered = this.allMockOrders;

    if (snapshot.status) {
      filtered = filtered.filter(
        order => order.status === snapshot.status
      );
    }

    const start = snapshot.page * snapshot.size;
    const end = start + snapshot.size;

    this.state.update(current => ({
      ...current,
      items: filtered.slice(start, end),
      total: filtered.length,
      loading: false
    }));
  }

  /* ---------------------------
     STATUS CHANGE
  ---------------------------- */

  onStatusTabChange(tab: any): void {
    this.statusTabs.forEach(t => (t.active = t === tab));

    this.state.update(current => ({
      ...current,
      status: tab.id,
      page: 0
    }));

    this.loadOrders();
  }

  /* ---------------------------
     PAGINATION
  ---------------------------- */

  onTablePageChange(event: any): void {
    this.state.update(current => ({
      ...current,
      page: event.page,
      size: event.pageSize
    }));

    this.loadOrders();
  }

  /* ---------------------------
     TAB SWITCH
  ---------------------------- */

  onTabChange(tab: any): void {
    this.tabs.forEach(t => (t.active = t === tab));
  }

  /* ---------------------------
     DATE RANGE
  ---------------------------- */

  onDateRangeApply(range: any): void {
    this.fromDate = range.from
      ? range.from.toISOString()
      : null;

    this.toDate = range.to
      ? range.to.toISOString()
      : null;
  }

  get activeStatusLabel(): string {
    const active = this.statusTabs.find(tab => tab.active);
    return active ? active.label : 'All';
  }
}