import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrl: './hubs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubsComponent {}

