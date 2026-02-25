import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AVAILABLE_CHANNELS } from '../channel-orders.constants';
import { AmazonChannelConfigComponent } from './amazon-channel-config/amazon-channel-config.component';

@Component({
  selector: 'app-add-channel',
  standalone: true,
  imports: [
    CommonModule,
    AmazonChannelConfigComponent
  ],
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddChannelComponent {
  channels = AVAILABLE_CHANNELS;
  showAmazonConfig = false;

  onConfigClick(channelId: string) {
    if (channelId === 'amazon') {
      this.showAmazonConfig = true;
    }
  }
}
