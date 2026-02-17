import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-reverse-single-pickup',
  templateUrl: './reverse-single-pickup.component.html',
  styleUrl: './reverse-single-pickup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ReverseSinglePickupComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    fetch: this.fb.group({
      orderId: [''],
      awb: [''],
    }),
    pickup: this.fb.group({
      consigneeName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      alternateNumber: [''],
      email: [''],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      pinCode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['India', Validators.required],
      addressType: ['Home', Validators.required],
    }),
    pkg: this.fb.group({
      productName: ['', Validators.required],
      quantity: [1, Validators.required],
      productValue: [0, Validators.required],
      productCategory: [''],
      sku: [''],
      weightKg: ['', Validators.required],
      lengthCm: ['', Validators.required],
      widthCm: ['', Validators.required],
      heightCm: ['', Validators.required],
    }),
    returnSection: this.fb.group({
      returnAddressId: ['', Validators.required],
    }),
  });

  getDetails(): void {
    const fetch = this.form.get('fetch')?.value;
    console.log('Fetch reverse order details', fetch);
  }

  resetForm(): void {
    this.form.reset({
      fetch: {
        orderId: '',
        awb: '',
      },
      pickup: {
        consigneeName: '',
        mobileNumber: '',
        alternateNumber: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        pinCode: '',
        city: '',
        state: '',
        country: 'India',
        addressType: 'Home',
      },
      pkg: {
        productName: '',
        quantity: 1,
        productValue: 0,
        productCategory: '',
        sku: '',
        weightKg: '',
        lengthCm: '',
        widthCm: '',
        heightCm: '',
      },
      returnSection: {
        returnAddressId: '',
      },
    });
  }

  createReverseOrder(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    console.log('Create reverse single pickup order', payload);
  }
}
