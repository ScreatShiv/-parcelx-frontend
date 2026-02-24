import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AVAILABLE_CHANNELS } from '../channel-orders.constants';

@Component({
  selector: 'app-add-channel',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div class="add-channel-container">
      <div class="channels-grid">
        @for (channel of channels; track channel.id) {
          <div class="channel-card">
            <div class="channel-logo">
              <!-- Using fallback icon for now since images might not exist -->
              <!-- In real implementation, use <img> tag with fallback -->
              <span [class]="channel.logoClass" [style.color]="channel.color" style="font-size: 2.5rem;"></span>
              <!-- <img [src]="channel.logo" [alt]="channel.name" /> -->
            </div>
            <div class="channel-actions">
              <button class="config-btn">
                <span class="pi pi-cog"></span>
                Config
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .add-channel-container {
      padding: 1rem;
    }

    .channels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1.5rem;
    }

    .channel-card {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      transition: all 0.2s;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border-color: #d1d5db;
      }

      .channel-logo {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
      }

      .channel-actions {
        .config-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: transparent;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          color: #4b5563;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: #f9fafb;
            color: #111827;
            border-color: #d1d5db;
          }

          .pi {
            font-size: 0.875rem;
          }
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddChannelComponent {
  channels = AVAILABLE_CHANNELS;
}
