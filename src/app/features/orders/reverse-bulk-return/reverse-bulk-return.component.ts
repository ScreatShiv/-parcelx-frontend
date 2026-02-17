import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-reverse-bulk-return',
  templateUrl: './reverse-bulk-return.component.html',
  styleUrl: './reverse-bulk-return.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ReverseBulkReturnComponent {
  selectedFileName: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    this.selectedFileName = file ? file.name : null;
  }

  submit(): void {
    if (!this.selectedFileName) {
      return;
    }
    console.log('Submit reverse bulk return', this.selectedFileName);
  }

  reset(): void {
    this.selectedFileName = null;
  }
}
