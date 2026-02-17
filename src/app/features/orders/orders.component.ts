import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForwardSingleOrderComponent } from './forward-single/forward-single-order.component';
import { ForwardBulkOrderComponent } from './forward-bulk/forward-bulk-order.component';
import { ReverseSinglePickupComponent } from './reverse-single-pickup/reverse-single-pickup.component';
import { ReverseQuickPickupComponent } from './reverse-quick-pickup/reverse-quick-pickup.component';
import { ReverseBulkReturnComponent } from './reverse-bulk-return/reverse-bulk-return.component';

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ForwardSingleOrderComponent,
    ForwardBulkOrderComponent,
    ReverseSinglePickupComponent,
    ReverseQuickPickupComponent,
    ReverseBulkReturnComponent,
  ],
})
export class OrdersComponent {
  direction: 'FORWARD' | 'REVERSE' = 'FORWARD';
  forwardType: 'SINGLE' | 'BULK' = 'SINGLE';
  reverseType: 'SINGLE_PICKUP' | 'QUICK_PICKUP' | 'BULK_RETURN' = 'SINGLE_PICKUP';

  setDirection(direction: 'FORWARD' | 'REVERSE'): void {
    this.direction = direction;
  }

  setForwardType(type: 'SINGLE' | 'BULK'): void {
    this.forwardType = type;
  }

  setReverseType(type: 'SINGLE_PICKUP' | 'QUICK_PICKUP' | 'BULK_RETURN'): void {
    this.reverseType = type;
  }
}
