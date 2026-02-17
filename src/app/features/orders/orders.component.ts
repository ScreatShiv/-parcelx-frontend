import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForwardSingleOrderComponent } from './forward-single/forward-single-order.component';
import { ForwardBulkOrderComponent } from './forward-bulk/forward-bulk-order.component';

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ForwardSingleOrderComponent, ForwardBulkOrderComponent],
})
export class OrdersComponent {
  direction: 'FORWARD' | 'REVERSE' = 'FORWARD';
  orderType: 'SINGLE' | 'BULK' = 'SINGLE';

  setDirection(direction: 'FORWARD' | 'REVERSE'): void {
    this.direction = direction;
  }

  setOrderType(type: 'SINGLE' | 'BULK'): void {
    this.orderType = type;
  }
}
