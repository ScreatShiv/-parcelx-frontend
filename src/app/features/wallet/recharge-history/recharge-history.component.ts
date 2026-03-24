import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';

interface RechargeHistoryRow {
  id: number;
  transactionDate: string;
  reference: string;
  paymentId: string;
  transactionType: string;
  amount: number;
  status: 'Success' | 'Failed' | 'Pending';
  source: string;
  addedBy: string;
}

@Component({
  selector: 'app-recharge-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DatePickerModule,
    InputTextModule,
    SelectModule,
    TableModule,
    TagModule,
  ],
  templateUrl: './recharge-history.component.html',
  styleUrls: ['./recharge-history.component.scss'],
})
export class RechargeHistoryComponent {
  dateRange: Date[] | undefined;

  searchTypes = [
    { label: 'Reference #', value: 'reference' },
    { label: 'Payment Id', value: 'paymentId' },
    { label: 'Transaction Type', value: 'transactionType' },
  ];
  selectedSearchType: 'reference' | 'paymentId' | 'transactionType' = 'reference';
  searchValue = '';

  amountMin: number | null = null;
  amountMax: number | null = null;

  pageSizeOptions = [10, 25, 50, 100];
  pageSize = 50;
  page = 0;

  private readonly allRows: RechargeHistoryRow[] = [
    {
      id: 1,
      transactionDate: '19 Mar, 2026 | 18:46:19',
      reference: 'PPJ531773926819C25Q34',
      paymentId: 'OMD2803181451565788200983W',
      transactionType: 'Wallet recharge by user',
      amount: 250.0,
      status: 'Success',
      source: 'PhonePe',
      addedBy: 'GOVIND SHARMA',
    },
    {
      id: 2,
      transactionDate: '19 Mar, 2026 | 12:29:56',
      reference: 'PPJ531773903378C3243',
      paymentId: 'OMD280319122618420064351W',
      transactionType: 'Wallet recharge by user',
      amount: 600.0,
      status: 'Success',
      source: 'PhonePe',
      addedBy: 'GOVIND SHARMA',
    },
  ];

  private filteredRows: RechargeHistoryRow[] = [...this.allRows];

  get total(): number {
    return this.filteredRows.length;
  }

  get items(): RechargeHistoryRow[] {
    const start = this.page * this.pageSize;
    return this.filteredRows.slice(start, start + this.pageSize);
  }

  onPageSizeChange(event: Event): void {
    this.pageSize = Number((event.target as HTMLSelectElement).value);
    this.page = 0;
  }

  onPrev(): void {
    if (this.page > 0) {
      this.page--;
    }
  }

  onNext(): void {
    if ((this.page + 1) * this.pageSize < this.total) {
      this.page++;
    }
  }

  onSearch(): void {
    const text = this.searchValue.trim().toLowerCase();
    const min = this.amountMin ?? Number.NEGATIVE_INFINITY;
    const max = this.amountMax ?? Number.POSITIVE_INFINITY;

    this.filteredRows = this.allRows.filter((row) => {
      const amountOk = row.amount >= min && row.amount <= max;
      if (!amountOk) return false;

      if (!text) return true;

      const fieldValue = String((row as any)[this.selectedSearchType] ?? '').toLowerCase();
      return fieldValue.includes(text);
    });

    this.page = 0;
  }

  onReset(): void {
    this.dateRange = undefined;
    this.selectedSearchType = 'reference';
    this.searchValue = '';
    this.amountMin = null;
    this.amountMax = null;
    this.filteredRows = [...this.allRows];
    this.page = 0;
  }

  onExport(): void {
    const rows = this.items;
    const header = [
      '#',
      'Transaction Date',
      'Reference #',
      'Payment Id',
      'Transaction Type',
      'Amount',
      'Status',
      'Source',
      'Added By',
    ];
    const lines = rows.map((r) =>
      [
        r.id,
        r.transactionDate,
        r.reference,
        r.paymentId,
        r.transactionType,
        r.amount,
        r.status,
        r.source,
        r.addedBy,
      ]
        .map((v) => `"${String(v).replaceAll('"', '""')}"`)
        .join(','),
    );
    const csv = [header.map((h) => `"${h}"`).join(','), ...lines].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recharge-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  getStatusSeverity(
    status: RechargeHistoryRow['status'],
  ): 'success' | 'danger' | 'warn' {
    if (status === 'Success') return 'success';
    if (status === 'Failed') return 'danger';
    return 'warn';
  }
}

