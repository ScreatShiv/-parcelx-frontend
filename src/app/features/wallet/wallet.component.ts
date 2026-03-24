import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { RechargeHistoryComponent } from './recharge-history/recharge-history.component';
import { AddMoneyComponent } from './add-money/add-money.component';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    SelectModule,
    DatePickerModule,
    InputTextModule,
    TableModule,
    CheckboxModule,
    TagModule,
    RechargeHistoryComponent,
    AddMoneyComponent
  ],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  // ── Tabs ──────────────────────────────────────────────
  tabs = [
    { label: 'Wallet Deduction', id: 'deduction' },
    { label: 'Recharge History', id: 'recharge' },
    { label: 'Add Money', id: 'add_money' }
  ];
  activeTab = this.tabs[0];

  // ── Filters ───────────────────────────────────────────
  dateTypes = [
    { label: 'Transaction Date', value: 'transaction_date' },
    { label: 'Order Date', value: 'order_date' }
  ];
  selectedDateType = 'transaction_date';

  dateRange: Date[] | undefined;

  searchTypes = [
    { label: 'Tracking Id', value: 'tracking_id' },
    { label: 'Order Id', value: 'order_id' },
    { label: 'Transaction Id', value: 'transaction_id' }
  ];
  selectedSearchType = 'tracking_id';
  searchValue = '';

  amountMin: number | null = null;
  amountMax: number | null = null;

  // ── Table state ───────────────────────────────────────
  title = 'Wallet Transactions';
  subtitle = 'All wallet deductions and recharges';
  loading = false;

  pageSizeOptions = [10, 25, 50, 100];
  pageSize = 10;
  page = 0;

  selectedRows: any[] = [];
  allSelected = false;

  // ── Raw data ──────────────────────────────────────────
  private allData = [
    {
      id: 1,
      orderDate: '23 Feb 26 | 10:54 am',
      orderId: 'SMOTEC-6454',
      status: 'Cancelled',
      trackingCourier: 'Delhivery',
      trackingAwb: '13630012220520',
      trackingStatus: 'Cancelled',
      transactionId: 'X151320FCQ0VM018734458',
      transactionDate: '25 Feb 26 | 13:05 pm',
      transactionType: 'Transactions',
      opn: 316.34,
      cls: 505.14,
      amt: 188.80,
      transactionNote: 'OrderCancel',
      amount: 10964.00,
      paymentMode: 'PPD',
      billingWeight: '5.00Kg(s)',
      zone: 'D',
      charges: { forward: 0, rto: 0, cancel: 188.80, weight: 0 }
    },
    {
      id: 2,
      orderDate: '23 Feb 26 | 11:01 am',
      orderId: 'SMOTEC-6458',
      status: 'In Transit',
      trackingCourier: 'Delhivery',
      trackingAwb: '13630012220553',
      trackingStatus: 'In Transit',
      transactionId: '513177182498705272',
      transactionDate: '23 Feb 26 | 11:01 am',
      transactionType: 'OrderProcessing',
      opn: 505.14,
      cls: 316.34,
      amt: 188.80,
      transactionNote: 'OrderProcessing',
      amount: 10900.00,
      paymentMode: 'PPD',
      billingWeight: '5.00Kg(s)',
      zone: 'E',
      charges: { forward: 188.80, rto: 0, cancel: 0, weight: 0 }
    },
    {
      id: 3,
      orderDate: '23 Feb 26 | 10:54 am',
      orderId: 'SMOTEC-6454',
      status: 'Cancelled',
      trackingCourier: 'Delhivery',
      trackingAwb: '13630012220520',
      trackingStatus: 'Cancelled',
      transactionId: '5131771824292045942',
      transactionDate: '23 Feb 26 | 10:54 am',
      transactionType: 'OrderProcessing',
      opn: 693.94,
      cls: 505.14,
      amt: 188.80,
      transactionNote: 'OrderProcessing',
      amount: 10964.00,
      paymentMode: 'PPD',
      billingWeight: '5.00Kg(s)',
      zone: 'D',
      charges: { forward: 188.80, rto: 0, cancel: 0, weight: 0 }
    },
    {
      id: 4,
      orderDate: '23 Feb 26 | 10:42 am',
      orderId: 'PHARMAZEN-0837',
      status: 'In Transit',
      trackingCourier: 'Delhivery',
      trackingAwb: '13630012220391',
      trackingStatus: 'In Transit',
      transactionId: '5131771823567023206',
      transactionDate: '23 Feb 26 | 10:42 am',
      transactionType: 'OrderProcessing',
      opn: 1000.74,
      cls: 693.94,
      amt: 306.80,
      transactionNote: 'OrderProcessing',
      amount: 12934.00,
      paymentMode: 'PPD',
      billingWeight: '10.00Kg(s)',
      zone: 'E',
      charges: { forward: 306.80, rto: 0, cancel: 0, weight: 0 }
    },
    {
      id: 5,
      orderDate: '-',
      orderId: '-',
      status: '',
      trackingCourier: '-',
      trackingAwb: '-',
      trackingStatus: '',
      transactionId: 'P_1513177182343703569',
      transactionDate: '23 Feb 26 | 10:41 am',
      transactionType: 'Payment Added',
      opn: 0.74,
      cls: 1000.74,
      amt: 1000.00,
      transactionNote: 'Payment Added',
      amount: null,
      paymentMode: '',
      billingWeight: '-',
      zone: '-',
      charges: { forward: 0, rto: 0, cancel: 0, weight: 0 }
    },
    {
      id: 6,
      orderDate: '17 Feb 26 | 14:15 pm',
      orderId: 'PAWAN',
      status: 'Delivered',
      trackingCourier: 'Delhivery',
      trackingAwb: '13630012210040',
      trackingStatus: 'Delivered',
      transactionId: '5131771436669018659289FW1000',
      transactionDate: '19 Feb 26 | 15:54 pm',
      transactionType: 'Transactions',
      opn: 24.34,
      cls: 0.74,
      amt: 23.60,
      transactionNote: 'Weight update charges',
      amount: 76224.00,
      paymentMode: 'PPD',
      billingWeight: '6.00Kg(s)',
      zone: 'F',
      charges: { forward: 0, rto: 0, cancel: 0, weight: 23.60 }
    }
  ];

  // ── Derived ───────────────────────────────────────────

  /** Total count (use filteredData.length when you add filtering) */
  get total(): number {
    return this.allData.length;
  }

  /** Slice of data for the current page */
  get items(): any[] {
    const start = this.page * this.pageSize;
    return this.allData.slice(start, start + this.pageSize);
  }

  /** Total number of pages */
  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  get hasPrev(): boolean {
    return this.page > 0;
  }

  get hasNext(): boolean {
    return this.page < this.totalPages - 1;
  }

  // ── Lifecycle ─────────────────────────────────────────
  ngOnInit(): void { }

  // ── Tab ───────────────────────────────────────────────
  onTabChange(tab: any): void {
    this.activeTab = tab;
    this.page = 0;
    this.selectedRows = [];
    this.allSelected = false;
  }

  // ── Pagination ────────────────────────────────────────
  onPageSizeChange(event: Event): void {
    this.pageSize = Number((event.target as HTMLSelectElement).value);
    this.page = 0;
    this.selectedRows = [];
    this.allSelected = false;
  }

  onPrev(): void {
    if (this.hasPrev) {
      this.page--;
      this.selectedRows = [];
      this.allSelected = false;
    }
  }

  onNext(): void {
    if (this.hasNext) {
      this.page++;
      this.selectedRows = [];
      this.allSelected = false;
    }
  }

  goToPage(p: number): void {
    if (p >= 0 && p < this.totalPages) {
      this.page = p;
      this.selectedRows = [];
      this.allSelected = false;
    }
  }

  // ── Selection ─────────────────────────────────────────
  onSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.allSelected = checked;
    this.selectedRows = checked ? [...this.items] : [];
  }

  onRowSelect(event: Event, row: any): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedRows = [...this.selectedRows, row];
    } else {
      this.selectedRows = this.selectedRows.filter(r => r.id !== row.id);
      this.allSelected = false;
    }
  }

  isSelected(row: any): boolean {
    return this.selectedRows.some(r => r.id === row.id);
  }

  // ── Filters ───────────────────────────────────────────
  onSearch(): void {
    // Wire up your API call / filter logic here
    this.page = 0;
    this.selectedRows = [];
    this.allSelected = false;
  }

  onReset(): void {
    this.searchValue = '';
    this.selectedSearchType = 'tracking_id';
    this.selectedDateType = 'transaction_date';
    this.dateRange = undefined;
    this.amountMin = null;
    this.amountMax = null;
    this.page = 0;
    this.selectedRows = [];
    this.allSelected = false;
  }

  // ── Export ────────────────────────────────────────────
  onExport(): void {
    // Wire up export logic here
    console.log('Exporting', this.selectedRows.length ? this.selectedRows : this.items);
  }
}
