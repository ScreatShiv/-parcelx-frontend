import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { Popover, PopoverModule } from 'primeng/popover';

export interface DateRangeValue {
  from: Date | null;
  to: Date | null;
}

type Preset =
  | 'TODAY'
  | 'YESTERDAY'
  | 'LAST_7'
  | 'LAST_30'
  | 'THIS_MONTH'
  | 'LAST_MONTH'
  | 'CUSTOM';

@Component({
  standalone: true,
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, DatePickerModule, PopoverModule],
})
export class DateRangeComponent implements OnInit {
  @Output() apply = new EventEmitter<DateRangeValue>();

  @ViewChild('popover') popover?: Popover;

  fromDate: Date | null = null;
  toDate: Date | null = null;

  fromHour = 12;
  fromMinute = 0;
  fromAmPm: 'AM' | 'PM' = 'AM';

  toHour = 11;
  toMinute = 59;
  toAmPm: 'AM' | 'PM' = 'PM';

  readonly hours = Array.from({ length: 12 }, (_, i) => i + 1);
  readonly minutes = Array.from({ length: 60 }, (_, i) => i);

  activePreset: Preset = 'THIS_MONTH';

  ngOnInit(): void {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    this.fromDate = start;
    this.toDate = end;
    this.fromHour = 12;
    this.fromMinute = 0;
    this.fromAmPm = 'AM';
    this.toHour = 11;
    this.toMinute = 59;
    this.toAmPm = 'PM';
  }

  open(event: Event): void {
    this.popover?.toggle(event);
  }

  selectPreset(preset: Preset): void {
    const now = new Date();
    const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);

    let from: Date;
    let to: Date;

    if (preset === 'TODAY') {
      from = startOfDay(now);
      to = endOfDay(now);
    } else if (preset === 'YESTERDAY') {
      const y = new Date(now);
      y.setDate(y.getDate() - 1);
      from = startOfDay(y);
      to = endOfDay(y);
    } else if (preset === 'LAST_7') {
      const s = new Date(now);
      s.setDate(s.getDate() - 6);
      from = startOfDay(s);
      to = endOfDay(now);
    } else if (preset === 'LAST_30') {
      const s = new Date(now);
      s.setDate(s.getDate() - 29);
      from = startOfDay(s);
      to = endOfDay(now);
    } else if (preset === 'THIS_MONTH') {
      from = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else if (preset === 'LAST_MONTH') {
      const firstOfLast = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
      const endOfLast = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
      from = firstOfLast;
      to = endOfLast;
    } else {
      this.activePreset = 'CUSTOM';
      return;
    }

    this.fromDate = from;
    this.toDate = to;
    this.fromHour = 12;
    this.fromMinute = 0;
    this.fromAmPm = 'AM';
    this.toHour = 11;
    this.toMinute = 59;
    this.toAmPm = 'PM';
    this.activePreset = preset;
  }

  private mergeDateTime(
    date: Date | null,
    hour: number,
    minute: number,
    ampm: 'AM' | 'PM',
  ): Date | null {
    if (!date) return null;
    let h = hour % 12;
    if (ampm === 'PM') h += 12;
    const d = new Date(date);
    d.setHours(h, minute, ampm === 'PM' && hour === 11 && minute === 59 ? 59 : 0, 0);
    return d;
  }

  private formatPart(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  get displayRange(): string {
    const from = this.mergeDateTime(this.fromDate, this.fromHour, this.fromMinute, this.fromAmPm);
    const to = this.mergeDateTime(this.toDate, this.toHour, this.toMinute, this.toAmPm);
    if (!from || !to) return '';
    return `${this.formatPart(from)} - ${this.formatPart(to)}`;
  }

  applyRange(): void {
    const from = this.mergeDateTime(this.fromDate, this.fromHour, this.fromMinute, this.fromAmPm);
    const to = this.mergeDateTime(this.toDate, this.toHour, this.toMinute, this.toAmPm);
    this.apply.emit({ from, to });
    this.popover?.hide();
  }

  cancel(): void {
    this.popover?.hide();
  }
}
