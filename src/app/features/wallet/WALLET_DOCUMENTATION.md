# Wallet Duration Type Structure & Styling Guide

This guide provides comprehensive documentation for the wallet duration type structure and SCSS styling for the wallet components.

## 📋 Table of Contents

- [Wallet Duration Types](#wallet-duration-types)
- [Wallet Models](#wallet-models)
- [SCSS Structure](#scss-structure)
- [Usage Examples](#usage-examples)
- [Integration Guide](#integration-guide)

---

## 🕐 Wallet Duration Types

The wallet system supports multiple validity periods. These are defined in `/src/app/models/wallet.model.ts`.

### Available Duration Types

```typescript
type WalletDurationType = 
  | '7_days'      // Valid for 7 days
  | '30_days'     // Valid for 30 days
  | '90_days'     // Valid for 90 days (3 months)
  | '180_days'    // Valid for 180 days (6 months)
  | '365_days'    // Valid for 1 year
  | 'lifetime'    // No expiry
```

### Duration Configuration

Each duration type has a configuration object:

```typescript
export interface WalletDurationConfig {
  type: WalletDurationType;
  label: string;          // Display label (e.g., "7 Days")
  days: number | null;    // Number of days (null for lifetime)
  description: string;    // Detailed description
}
```

### WALLET_DURATIONS Constant

Access pre-configured durations:

```typescript
import { WALLET_DURATIONS, WalletDurationType } from '@app/models/wallet.model';

// Get duration config
const config = WALLET_DURATIONS['30_days'];
console.log(config.label);       // "30 Days"
console.log(config.days);        // 30
console.log(config.description); // "Valid for 30 days from date of recharge"

// List all durations
Object.values(WALLET_DURATIONS).forEach(duration => {
  console.log(duration.label);
});
```

---

## 📦 Wallet Models

### 1. RechargeHistoryRecord

Represents a single recharge transaction:

```typescript
interface RechargeHistoryRecord {
  id: number;
  transactionDate: string;        // "19 Mar, 2026 | 18:46:19"
  reference: string;              // Reference ID
  paymentId: string;              // Payment gateway ID
  transactionType: string;
  amount: number;
  status: RechargeStatus;         // 'Success' | 'Failed' | 'Pending'
  source: PaymentSource;          // 'PhonePe', 'Google Pay', etc.
  addedBy: string;                // User who added the money
  durationValidity?: WalletDurationType;
  expiryDate?: string;
}
```

### 2. WalletBalance

Current wallet balance information:

```typescript
interface WalletBalance {
  id: string;
  totalBalance: number;
  availableBalance: number;
  frozenBalance: number;
  expiringBalance?: number;      // Balance expiring soon
  expiryDate?: string;
  lastUpdated: string;
}
```

### 3. AddMoneyRequest

Request payload for adding money:

```typescript
interface AddMoneyRequest {
  amount: number;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  durationValidity?: WalletDurationType;
  notes?: string;
}
```

### 4. WalletFilterCriteria

Filter options for querying wallet transactions:

```typescript
interface WalletFilterCriteria {
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  searchType?: 'reference' | 'paymentId' | 'transactionType' | 'trackingId';
  searchValue?: string;
  amountMin?: number;
  amountMax?: number;
  status?: RechargeStatus;
  source?: PaymentSource;
}
```

---

## 🎨 SCSS Structure

The wallet components use a comprehensive SCSS file: `shared-wallet.scss`

### SCSS Sections

#### 1. Filter Section Styles (`.filters-section`)

- Filter container with flex layout
- Group styling with labels
- Input field styling (text, number, date)
- Search input group (dropdown + text)
- Amount filter with min/max
- Select/Dropdown styling
- Date picker styling
- Filter action buttons

**Key Features:**
- Responsive flex layout
- Hover states with smooth transitions
- Focus states with orange accent color (#f97316)
- Disabled state styling
- Placeholder text styling

#### 2. Table Card Styles (`.table-card`)

- Main table container
- Header section (`.table-header`)
- Table wrapper (`.table-wrapper`)
- Empty state (`.empty-state`)
- Footer/pagination (`.table-footer`)

**Table Header:**
- Title and subtitle display
- Page size selector
- Export button

**Table Body:**
- Sortable columns
- Row hover effects
- Status badge styling
- Source pill styling
- Duration tag styling
- Currency formatting
- Date/time formatting

**Table Footer:**
- Pagination controls
- Page info display
- Navigation buttons

---

## 🔧 Usage Examples

### Using Duration Types in Components

```typescript
import { Component } from '@angular/core';
import { WALLET_DURATIONS, WalletDurationType } from '@app/models/wallet.model';

@Component({
  selector: 'app-add-money',
  template: `
    <select [(ngModel)]="selectedDuration">
      <option *ngFor="let d of durationOptions" [value]="d.type">
        {{ d.label }}
      </option>
    </select>
  `
})
export class AddMoneyComponent {
  selectedDuration: WalletDurationType = '30_days';
  durationOptions = Object.values(WALLET_DURATIONS);
}
```

### Displaying Duration in Recharge History

```typescript
// Component
export class RechargeHistoryComponent {
  getDurationLabel(durationValidity?: WalletDurationType): string {
    if (!durationValidity) return 'N/A';
    return WALLET_DURATIONS[durationValidity].label;
  }

  getExpiryDate(transactionDate: string, durationValidity?: WalletDurationType): string {
    if (!durationValidity || durationValidity === 'lifetime') return 'Lifetime';
    const days = WALLET_DURATIONS[durationValidity].days;
    // Calculate expiry date based on transactionDate and days
    return calculatedExpiryDate;
  }
}
```

```html
<!-- Template -->
<table>
  <tbody>
    <tr *ngFor="let record of records">
      <td>{{ record.reference }}</td>
      <td>{{ record.amount }}</td>
      <td>
        <span class="duration-tag" [ngClass]="record.durationValidity">
          {{ getDurationLabel(record.durationValidity) }}
        </span>
      </td>
      <td>
        <span class="status-badge" [ngClass]="record.status.toLowerCase()">
          {{ record.status }}
        </span>
      </td>
    </tr>
  </tbody>
</table>
```

---

## 📱 Integration Guide

### Step 1: Import Shared SCSS

In your component's SCSS file, import the shared wallet styles:

```scss
// recharge-history.component.scss
@import '../shared-wallet.scss';

// Component-specific styles below
.recharge-history-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
```

### Step 2: Import Models in Component

```typescript
// recharge-history.component.ts
import { RechargeHistoryRecord, WALLET_DURATIONS } from '@app/models/wallet.model';

@Component({
  // ...
})
export class RechargeHistoryComponent {
  records: RechargeHistoryRecord[] = [];
  // ...
}
```

### Step 3: Use CSS Classes in Template

```html
<!-- Filter Section -->
<div class="filters-section">
  <div class="filter-group">
    <label>Select Date</label>
    <p-datepicker [(ngModel)]="dateRange" selectionMode="range"></p-datepicker>
  </div>
  
  <div class="filter-group amount-filter">
    <label>Amount</label>
    <div class="amount-inputs">
      <input type="number" placeholder="Min" />
      <span class="separator">—</span>
      <input type="number" placeholder="Max" />
    </div>
  </div>

  <div class="filter-actions">
    <button class="search-btn">Search</button>
    <button class="reset-btn">Reset</button>
  </div>
</div>

<!-- Table Card -->
<section class="table-card">
  <header class="table-header">
    <div class="header-left">
      <h3 class="title">Recharge History</h3>
      <p class="subtitle">All your wallet recharges</p>
    </div>
    <div class="header-right">
      <div class="page-size">
        <label class="label">Show:</label>
        <select (change)="onPageSizeChange($event)">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
      </div>
      <button class="export-btn">Export</button>
    </div>
  </header>

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Transaction Date</th>
          <th>Reference</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Duration</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let record of items">
          <td class="date-time">{{ record.transactionDate }}</td>
          <td>{{ record.reference }}</td>
          <td class="currency">₹ {{ record.amount }}</td>
          <td>
            <span 
              class="status-badge" 
              [ngClass]="record.status.toLowerCase()"
            >
              {{ record.status }}
            </span>
          </td>
          <td>
            <span 
              class="duration-tag"
              [ngClass]="record.durationValidity === 'lifetime' ? 'lifetime' : 'limited'"
            >
              {{ getDurationLabel(record.durationValidity) }}
            </span>
          </td>
          <td>{{ record.expiryDate || 'N/A' }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <footer class="table-footer">
    <div class="page-info">
      Showing <span class="current-page">{{ (page * pageSize) + 1 }}</span>
      to <span class="current-page">{{ page * pageSize + items.length }}</span>
      of <span class="total-pages">{{ total }}</span>
    </div>
    <div class="pagination">
      <button class="pager-btn" [disabled]="page === 0" (click)="onPrev()">←</button>
      <span class="pager-page">{{ page + 1 }}</span>
      <button class="pager-btn" [disabled]="page >= totalPages - 1" (click)="onNext()">→</button>
    </div>
  </footer>
</section>
```

---

## 🎯 CSS Classes Reference

### Filter Input Classes

| Class | Purpose |
|-------|---------|
| `.filters-section` | Main filter container |
| `.filter-group` | Individual filter field group |
| `.search-input-group` | Dropdown + input combination |
| `.amount-filter` | Amount min/max filter |
| `.filter-actions` | Action buttons container |
| `.search-btn` | Search button |
| `.reset-btn` | Reset button |

### Table Classes

| Class | Purpose |
|-------|---------|
| `.table-card` | Main table container |
| `.table-header` | Table header section |
| `.table-wrapper` | Table content wrapper |
| `.table-footer` | Pagination footer |
| `.status-badge` | Status indicator |
| `.source-pill` | Payment source indicator |
| `.duration-tag` | Validity duration indicator |
| `.currency` | Currency formatted value |
| `.date-time` | Date/time display |

### Table Row Classes

```html
<tr>
  <td>
    <span class="status-badge success">Success</span>
    <span class="status-badge failed">Failed</span>
    <span class="status-badge pending">Pending</span>
  </td>
  <td>
    <span class="duration-tag">7 Days</span>
    <span class="duration-tag lifetime">Lifetime</span>
  </td>
</tr>
```

---

## 📊 Responsive Behavior

The SCSS includes responsive breakpoints:

- **Desktop (> 1024px):** Full layout with all features
- **Tablet (768px - 1024px):** Column stacking with adjusted spacing
- **Mobile (480px - 768px):** Full-width inputs, reduced padding
- **Small Mobile (< 480px):** Minimal padding, larger touch targets

---

## 🎓 Best Practices

### 1. Always Import Models
```typescript
import { RechargeHistoryRecord, WALLET_DURATIONS } from '@app/models/wallet.model';
```

### 2. Use Type Safety
```typescript
const duration: WalletDurationType = '30_days';
const config = WALLET_DURATIONS[duration];
```

### 3. Handle Optional Fields
```typescript
if (record.durationValidity && record.durationValidity !== 'lifetime') {
  // Show expiry date
}
```

### 4. Maintain CSS Class Consistency
- Always use provided CSS classes
- Don't override styles unnecessarily
- Use component-specific SCSS files for additional styles

---

## 📝 Notes

- All colors follow the design system (orange: #f97316, gray: #6b7280, etc.)
- Transitions use 0.2-0.3s ease for smooth interactions
- All inputs support focus states with visual feedback
- Tables are responsive and work on mobile devices
- PrimeNG components (Select, DatePicker) are integrated
