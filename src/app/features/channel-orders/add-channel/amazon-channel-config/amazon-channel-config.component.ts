import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-amazon-channel-config',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule
  ],
  templateUrl: './amazon-channel-config.component.html',
  styleUrls: ['./amazon-channel-config.component.scss']
})
export class AmazonChannelConfigComponent {
  @Output() close = new EventEmitter<void>();
  
  visible = true;
  configForm: FormGroup;
  
  pickupAddresses = [
    { label: 'Warehouse A - Mumbai (Default)', value: 'warehouse_a' },
    { label: 'Warehouse B - Delhi', value: 'warehouse_b' },
    { label: 'Store 1 - Bangalore', value: 'store_1' },
    { label: 'Store 2 - Pune', value: 'store_2' }
  ];

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      channelName: ['Amazon'],
      shopName: ['', Validators.required],
      merchantAuthToken: [''],
      pickupAddress: [null]
    });
  }

  onClose() {
    this.visible = false;
    this.close.emit();
  }

  onConnect() {
    if (this.configForm.valid) {
      console.log('Connecting Amazon Channel:', this.configForm.value);
      this.onClose();
    }
  }
}
