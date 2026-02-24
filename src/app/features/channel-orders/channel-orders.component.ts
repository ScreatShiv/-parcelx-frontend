import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CustomTableComponent, CustomTableColumn } from '../../shared/shipments-table/shipments-table.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { DATA_TYPES, SEARCH_TYPES, ADVANCE_FILTERS, CHANNEL_TABS, STATUS_TABS, PROCESS_TYPE } from './channel-orders.constants';

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
    AddChannelComponent
  ],
  templateUrl: './channel-orders.component.html',
  styleUrl: './channel-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelOrdersComponent implements OnInit {
  tabs = CHANNEL_TABS.map((tab, index) => ({ ...tab, active: index === 0 }));
  statusTabs = STATUS_TABS.map((tab, index) => ({ ...tab, active: index === 0 }));

  dateTypes = [...DATA_TYPES];
  selectedDateType = DATA_TYPES[0].value;

  searchTypes = [...SEARCH_TYPES];
  selectedSearchType = SEARCH_TYPES[0].value;

  advanceFilters = [...ADVANCE_FILTERS];
  selectedAdvanceFilter = null;
  processTypes = [...PROCESS_TYPE];

  columns: CustomTableColumn[] = [
    { key: 'orderDetails', label: 'Order Details' },
    { key: 'storeDetails', label: 'Store Details' },
    { key: 'productDetails', label: 'Product Details' },
    { key: 'amountDetails', label: 'Amount Details' },
    { key: 'address', label: 'Address' },
    { key: 'communications', label: 'Communications' },
    { key: 'action', label: 'Action' }
  ];

  orders: any[] = [];
  dates: Date[] | undefined;

  private allMockOrders: any[] = [
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
    },
    {
      id: 'CH-104',
      status: 'failed',
      orderDetails: { id: 'CH-104', date: '2026-02-22', source: 'Shopify' },
      storeDetails: { name: 'My Fashion Store', location: 'Mumbai' },
      productDetails: { name: 'Denim Jacket', sku: 'DJ-004', qty: 1 },
      amountDetails: { total: 1800, status: 'Paid' },
      address: { consignee: 'Sneha Reddy', city: 'Hyderabad', pincode: '500001' },
      communications: { email: 'none', sms: 'none' }
    },
    {
      id: 'CH-105',
      status: 'fulfilled',
      orderDetails: { id: 'CH-105', date: '2026-02-21', source: 'Magento' },
      storeDetails: { name: 'Gadget Galaxy', location: 'Pune' },
      productDetails: { name: 'USB-C Cable', sku: 'UC-005', qty: 3 },
      amountDetails: { total: 900, status: 'Paid' },
      address: { consignee: 'Vikram Singh', city: 'Pune', pincode: '411001' },
      communications: { email: 'sent', sms: 'sent' }
    },
    {
      id: 'CH-106',
      status: 'junk',
      orderDetails: { id: 'CH-106', date: '2026-02-20', source: 'Shopify' },
      storeDetails: { name: 'My Fashion Store', location: 'Mumbai' },
      productDetails: { name: 'Test Product', sku: 'TEST-001', qty: 1 },
      amountDetails: { total: 10, status: 'Unpaid' },
      address: { consignee: 'Test User', city: 'Unknown', pincode: '000000' },
      communications: { email: 'none', sms: 'none' }
    },
    {
      id: 'CH-107',
      status: 'on_process',
      orderDetails: { id: 'CH-107', date: '2026-02-25', source: 'Amazon' },
      storeDetails: { name: 'Tech Hub', location: 'Delhi' },
      productDetails: { name: 'Gaming Mouse', sku: 'GM-007', qty: 1 },
      amountDetails: { total: 1500, status: 'Paid' },
      address: { consignee: 'Anjali Gupta', city: 'Kolkata', pincode: '700001' },
      communications: { email: 'pending', sms: 'pending' }
    }
  ];

  ngOnInit(): void {
    this.filterOrders();
  }

  onTabChange(tab: any): void {
    this.tabs.forEach(t => t.active = (t === tab));
  }

  onStatusTabChange(tab: any): void {
    this.statusTabs.forEach(t => t.active = (t === tab));
    this.filterOrders();
  }

  private filterOrders(): void {
    const activeStatusTab = this.statusTabs.find(t => t.active);
    if (activeStatusTab) {
      this.orders = this.allMockOrders.filter(o => o.status === activeStatusTab.id);
    }
  }
}
