import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

type BulkAction = 'PLACE' | 'DRAFT';

interface BulkParseResult {
  fileName: string;
  rowCount: number;
  columns: string[];
}

@Component({
  standalone: true,
  selector: 'app-forward-bulk-order',
  templateUrl: './forward-bulk-order.component.html',
  styleUrl: './forward-bulk-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ForwardBulkOrderComponent {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  uploadInfo: BulkParseResult | null = null;
  parsedRows: Record<string, unknown>[] = [];
  parseError: string | null = null;
  lastAction: BulkAction | null = null;
  isProcessing = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) {
      return;
    }

    this.uploadInfo = null;
    this.parsedRows = [];
    this.parseError = null;
    this.lastAction = null;

    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!extension || !['csv', 'xls', 'xlsx'].includes(extension)) {
      this.parseError = 'Unsupported file type. Please upload CSV or Excel file.';
      this.clearFileInput();
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => {
      this.parseError = 'Failed to read file.';
      this.clearFileInput();
    };

    reader.onload = () => {
      try {
        if (extension === 'csv') {
          const text = String(reader.result ?? '');
          this.applyCsvResult(text, file.name);
        } else {
          const buffer = reader.result as ArrayBuffer;
          this.applyExcelResult(buffer, file.name);
        }
      } catch (error) {
        this.parseError = 'Unable to parse file. Please check the format.';
        this.uploadInfo = null;
        this.parsedRows = [];
      }
    };

    if (extension === 'csv') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  onPlace(): void {
    if (!this.uploadInfo) {
      this.parseError = 'Please upload a file before placing orders.';
      return;
    }
    this.isProcessing = true;
    this.lastAction = 'PLACE';
    // Placeholder for API integration
    console.log('PLACE bulk orders', {
      file: this.uploadInfo.fileName,
      rows: this.parsedRows,
    });
    this.isProcessing = false;
  }

  onDraft(): void {
    if (!this.uploadInfo) {
      this.parseError = 'Please upload a file before creating drafts.';
      return;
    }
    this.isProcessing = true;
    this.lastAction = 'DRAFT';
    // Placeholder for API integration
    console.log('DRAFT bulk orders', {
      file: this.uploadInfo.fileName,
      rows: this.parsedRows,
    });
    this.isProcessing = false;
  }

  onReset(): void {
    this.uploadInfo = null;
    this.parsedRows = [];
    this.parseError = null;
    this.lastAction = null;
    this.isProcessing = false;
    this.clearFileInput();
  }

  private applyCsvResult(content: string, fileName: string): void {
    const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);
    if (!lines.length) {
      this.parseError = 'The file is empty.';
      return;
    }

    const headers = lines[0].split(',').map((header) => header.trim());
    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i += 1) {
      const cells = lines[i].split(',');
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = (cells[index] ?? '').trim();
      });
      rows.push(row);
    }

    this.parsedRows = rows;
    this.uploadInfo = {
      fileName,
      rowCount: rows.length,
      columns: headers,
    };
  }

  private applyExcelResult(buffer: ArrayBuffer, fileName: string): void {
    const workbook = XLSX.read(buffer, { type: 'array' });
    if (!workbook.SheetNames.length) {
      this.parseError = 'The workbook does not contain any sheets.';
      return;
    }

    const firstSheet = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheet];
    const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: '',
    });

    const rows = json;
    const columns = rows.length ? Object.keys(rows[0]) : [];

    this.parsedRows = rows;
    this.uploadInfo = {
      fileName,
      rowCount: rows.length,
      columns,
    };
  }

  private clearFileInput(): void {
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
