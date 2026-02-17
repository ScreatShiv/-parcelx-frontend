import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-forward-single-order',
  templateUrl: './forward-single-order.component.html',
  styleUrl: './forward-single-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ForwardSingleOrderComponent {
  private readonly fb = inject(FormBuilder);

  activeStep = 1;
  readonly maxStep = 5;

  readonly form = this.fb.group({
    warehouse: this.fb.group({
      pickupWarehouseId: ['', Validators.required],
      hasReturnAddress: [false],
    }),
    destination: this.fb.group({
      consigneeName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      altContact: [''],
      email: [''],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      addressType: ['Home', Validators.required],
      pinCode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['India', Validators.required],
    }),
    invoice: this.fb.group({
      invoiceNumber: [''],
      preGeneratedWaybill: [''],
      isSddNdd: ['No', Validators.required],
    }),
    products: this.fb.array([this.createProductGroup()]),
    orderDetails: this.fb.group({
      paymentMode: ['Prepaid', Validators.required],
      orderAmount: [0, Validators.required],
      gstAmount: [0, Validators.required],
      extraCharges: [0],
      totalAmount: [0, Validators.required],
      codAmount: [0, Validators.required],
    }),
    package: this.fb.group({
      weightPreset: ['OTHER'],
      actualWeight: ['', Validators.required],
      length: [''],
      width: [''],
      height: [''],
      mps: ['No', Validators.required],
      courierMode: ['Surface'],
      courierSpeed: ['Express'],
      courierSort: [''],
      courierSelection: [''],
      courierTotal: [0],
    }),
  });

  get products(): FormArray {
    return this.form.get('products') as FormArray;
  }

  setStep(step: number): void {
    this.activeStep = step;
  }

  nextStep(): void {
    if (this.activeStep < this.maxStep) {
      this.activeStep += 1;
    }
  }

  prevStep(): void {
    if (this.activeStep > 1) {
      this.activeStep -= 1;
    }
  }

  addProductRow(): void {
    this.products.push(this.createProductGroup());
  }

  removeProductRow(index: number): void {
    if (this.products.length > 1) {
      this.products.removeAt(index);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    console.log('Forward single order payload', value);
  }

  private createProductGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, Validators.required],
      value: [0, Validators.required],
      sku: [''],
      hsn: [''],
      category: [''],
    });
  }
}
