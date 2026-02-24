import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shipment } from '../../models/shipment.model';

export interface CustomTableColumn {
  key: string;
  label: string;
  width?: string;
}

@Component({
  standalone: true,
  selector: 'app-customtable',
  templateUrl: './shipments-table.component.html',
  styleUrl: './shipments-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class CustomTableComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() pageSizeOptions: number[] = [10, 20, 50];
  @Input() pageSize = 10;
  @Input() page = 0;
  @Input() total = 0;
  @Input() loading = false;
  @Input() columns: CustomTableColumn[] = [];
  @Input() items: Shipment[] = [];
  @Input() showActionColumn = true;

  @Output() pageChange = new EventEmitter<{ page: number; size: number }>();

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const size = target?.value;
    const value = Number(size);
    if (!value) {
      return;
    }
    this.pageChange.emit({ page: 0, size: value });
  }

  onPrev(): void {
    if (this.page === 0) {
      return;
    }
    this.pageChange.emit({ page: this.page - 1, size: this.pageSize });
  }

  onNext(): void {
    const lastPage = Math.max(Math.ceil(this.total / this.pageSize) - 1, 0);
    if (this.page >= lastPage) {
      return;
    }
    this.pageChange.emit({ page: this.page + 1, size: this.pageSize });
  }
}
