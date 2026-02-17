import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-reverse-quick-pickup',
  templateUrl: './reverse-quick-pickup.component.html',
  styleUrl: './reverse-quick-pickup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ReverseQuickPickupComponent {
  private readonly fb = new FormBuilder();

  readonly filters = this.fb.group({
    awb: [''],
    dateRange: [''],
  });

  orders: Array<{
    id: string;
    waybill: string;
    mode: string;
    customer: string;
    address: string;
    pincode: string;
    product: string;
    status: string;
    orderDate: string;
  }> = [];

  selectedIds = new Set<string>();

  toggleSelection(id: string, checked: boolean): void {
    if (checked) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
  }

  search(): void {
    const value = this.filters.getRawValue();
    console.log('Search quick reverse orders', value);
  }

  returnSelected(): void {
    if (!this.selectedIds.size) {
      return;
    }
    const selected = this.orders.filter((o) => this.selectedIds.has(o.id));
    console.log('Return selected orders', selected);
  }
}
