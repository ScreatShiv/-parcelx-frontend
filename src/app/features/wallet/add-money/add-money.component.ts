import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

type PaymentMethod = 'phonepe';

@Component({
  selector: 'app-add-money',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss'],
})
export class AddMoneyComponent {
  amount: number | null = null;
  promoCode = '';
  appliedPromoCode: string | null = null;
  discount = 0;
  paymentMethod: PaymentMethod = 'phonepe';

  presets = [100, 500, 1000, 2000, 3000, 5000, 10000];

  setPreset(value: number): void {
    this.amount = value;
    this.recalculateDiscount();
  }

  applyPromo(): void {
    const code = this.promoCode.trim().toUpperCase();
    if (!code) {
      this.appliedPromoCode = null;
      this.discount = 0;
      return;
    }

    this.appliedPromoCode = code;
    this.recalculateDiscount();
  }

  removePromo(): void {
    this.promoCode = '';
    this.appliedPromoCode = null;
    this.discount = 0;
  }

  onAmountChange(): void {
    this.recalculateDiscount();
  }

  get totalToBeCredited(): number {
    return Math.max(0, (this.amount ?? 0) - this.discount);
  }

  get canContinue(): boolean {
    return (this.amount ?? 0) > 0;
  }

  continueToPayment(): void {
    if (!this.canContinue) return;
  }

  private recalculateDiscount(): void {
    const amount = this.amount ?? 0;
    if (!amount || !this.appliedPromoCode) {
      this.discount = 0;
      return;
    }

    if (this.appliedPromoCode === 'SAVE10') {
      this.discount = Math.min(100, Math.round(amount * 0.1));
      return;
    }

    this.discount = 0;
  }
}

