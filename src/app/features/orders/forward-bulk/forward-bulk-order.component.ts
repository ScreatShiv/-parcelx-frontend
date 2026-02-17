import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-forward-bulk-order',
  templateUrl: './forward-bulk-order.component.html',
  styleUrl: './forward-bulk-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ForwardBulkOrderComponent {}

