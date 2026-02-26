import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { Popover, PopoverModule } from 'primeng/popover';

export type Preset =
  | 'TODAY' | 'YESTERDAY' | 'LAST_7' | 'LAST_30'
  | 'THIS_MONTH' | 'LAST_MONTH' | 'CUSTOM';

export type DateType = 'PLACED_DATE' | 'DELIVERED_DATE';

export interface DateRangeValue {
  from: Date | null;
  to: Date | null;
  dateType: DateType;
}
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
  @ViewChild('popover') popover!: Popover;

  dateType: DateType = 'PLACED_DATE';

  fromDate: Date | null = null;
  toDate:   Date | null = null;

  fromHour = 12;  fromMinute = 0;  fromAmPm: 'AM' | 'PM' = 'AM';
  toHour   = 11;  toMinute   = 59; toAmPm:   'AM' | 'PM' = 'PM';

  readonly hours   = Array.from({ length: 12 }, (_, i) => i + 1);
  readonly minutes = Array.from({ length: 60 }, (_, i) => i);

  activePreset: Preset = 'THIS_MONTH';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.applyPresetDates('THIS_MONTH');
    this.resetTime();
  }

  open(event: Event): void {
    this.popover.toggle(event);
  }

  selectPreset(preset: Preset): void {
    this.activePreset = preset;
    if (preset === 'CUSTOM') return;
    this.applyPresetDates(preset);
    this.resetTime();
    this.cdr.markForCheck();
  }

  onDateChange(): void {
    this.activePreset = 'CUSTOM';
    this.cdr.markForCheck();
  }

  private applyPresetDates(preset: Preset): void {
    const now = new Date();
    const sod = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    const eod = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
    switch (preset) {
      case 'TODAY':
        this.fromDate = sod(now); this.toDate = eod(now); break;
      case 'YESTERDAY': {
        const y = new Date(now); y.setDate(y.getDate() - 1);
        this.fromDate = sod(y);  this.toDate = eod(y);    break;
      }
      case 'LAST_7': {
        const s = new Date(now); s.setDate(s.getDate() - 6);
        this.fromDate = sod(s);  this.toDate = eod(now);  break;
      }
      case 'LAST_30': {
        const s = new Date(now); s.setDate(s.getDate() - 29);
        this.fromDate = sod(s);  this.toDate = eod(now);  break;
      }
      case 'THIS_MONTH':
        this.fromDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
        this.toDate   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59); break;
      case 'LAST_MONTH':
        this.fromDate = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
        this.toDate   = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);     break;
    }
  }

  private resetTime(): void {
    this.fromHour = 12; this.fromMinute = 0;  this.fromAmPm = 'AM';
    this.toHour   = 11; this.toMinute   = 59; this.toAmPm   = 'PM';
  }

  private mergeDateTime(date: Date | null, h: number, m: number, ap: 'AM' | 'PM'): Date | null {
    if (!date) return null;
    let hr = h % 12;
    if (ap === 'PM') hr += 12;
    const d = new Date(date);
    d.setHours(hr, m, 0, 0);
    return d;
  }

  private fmt(d: Date | null): string {
    if (!d) return '';
    return d.toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true,
    });
  }

  get displayRange(): string {
    const f = this.mergeDateTime(this.fromDate, this.fromHour, this.fromMinute, this.fromAmPm);
    const t = this.mergeDateTime(this.toDate,   this.toHour,   this.toMinute,   this.toAmPm);
    return f && t ? `${this.fmt(f)} – ${this.fmt(t)}` : '';
  }

  applyRange(): void {
    const f = this.mergeDateTime(this.fromDate, this.fromHour, this.fromMinute, this.fromAmPm);
    const t = this.mergeDateTime(this.toDate,   this.toHour,   this.toMinute,   this.toAmPm);
    this.apply.emit({ from: f, to: t, dateType: this.dateType });
    this.popover.hide();
  }

  cancel(): void {
    this.popover.hide();
  }
}
