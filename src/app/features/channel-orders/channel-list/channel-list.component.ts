import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomTableComponent, CustomTableColumn } from '../../../shared/shipments-table/shipments-table.component';

@Component({
  selector: 'app-channel-list',
  standalone: true,
  imports: [CommonModule, CustomTableComponent],
  template: `
    <div class="channel-list-container">
      <div class="table-header-actions">
        <h3 class="table-title">Channels</h3>
      </div>
      <app-customtable
        [columns]="columns"
        [items]="channels"
        [total]="0"
        [showActionColumn]="false"
      >
        <div class="empty-state">
          No channels found.
        </div>
      </app-customtable>
    </div>
  `,
  styles: [`
    .channel-list-container {
      background-color: #ffffff;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

      .table-header-actions {
        margin-bottom: 1.5rem;
        .table-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }
      }

      .empty-state {
        padding: 3rem;
        text-align: center;
        color: #6b7280;
        font-size: 0.875rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelListComponent {
  columns: CustomTableColumn[] = [
    { key: 'channelName', label: 'Channel Name' },
    { key: 'status', label: 'Status' },
    { key: 'lastSync', label: 'Last Sync' },
    { key: 'action', label: 'Action' }
  ];

  channels: any[] = [];
}
