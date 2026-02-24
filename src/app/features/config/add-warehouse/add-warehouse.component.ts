import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-add-warehouse',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    DialogModule
  ],
  templateUrl: './add-warehouse.component.html',
  styleUrl: './add-warehouse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWarehouseComponent implements OnInit {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  warehouseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.warehouseForm = this.fb.group({
      businessName: ['', Validators.required],
      senderName: ['', Validators.required],
      fullAddress: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      pinCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.warehouseForm.valid) {
      this.save.emit(this.warehouseForm.value);
    } else {
      Object.keys(this.warehouseForm.controls).forEach(key => {
        const control = this.warehouseForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  onReset(): void {
    this.warehouseForm.reset();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
