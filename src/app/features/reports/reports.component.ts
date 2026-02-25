import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    InputTextModule,
    SelectModule,
    TableModule
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  selectAll = false;
  showAdvanceFilters = true;
  
  // Advance Filter Sections
  weightDetails = [
    { label: 'Length x Breadth x Height', checked: false },
    { label: 'Item Weight', checked: false },
    { label: 'Volumetric Dimensions', checked: false },
    { label: 'Charged Weight', checked: false },
    { label: 'Updated Weight', checked: false }
  ];

  masterChildDetails = [
    { label: 'Is MPS?', checked: false },
    { label: 'Master / Child status', checked: false },
    { label: 'Master / child waybill', checked: false },
    { label: 'Dimension and Weight', checked: false },
    { label: 'Number of child waybills', checked: false }
  ];

  shipmentEventDates = [
    { label: 'First Attempt Date', checked: false },
    { label: 'Last Attempt Date', checked: false },
    { label: 'RTO Marked Date', checked: false },
    { label: 'RTO Delivered Date', checked: false },
    { label: 'First NDR Remark', checked: false },
    { label: 'Last NDR Remark', checked: false }
  ];

  others = [
    { label: 'Is NDD', checked: false },
    { label: 'Zone', checked: false },
    { label: 'Delivery TAT', checked: false },
    { label: 'RTO Reason', checked: false },
    { label: 'Attempt Counts', checked: false },
    { label: 'COD TRN', checked: false },
    { label: 'Shipping Charges', checked: false }
  ];

  // Filters
  dateTypes = [
    { label: 'Placed', value: 'placed' },
    { label: 'Manifested', value: 'manifested' }
  ];
  selectedDateType = 'placed';
  
  dateRange: Date[] | undefined;
  
  expressTypes = [{ label: 'Select', value: null }];
  selectedExpressType = null;
  
  shipmentTypes = [{ label: 'Select', value: null }];
  selectedShipmentType = null;
  
  insuranceOptions = [{ label: 'Select', value: null }];
  selectedInsurance = null;
  
  searchTypes = [
    { label: 'Tracking ID', value: 'tracking_id' },
    { label: 'Order ID', value: 'order_id' }
  ];
  selectedSearchType = 'tracking_id';
  searchValue = '';

  // Status Tabs
  statuses = [
    { label: 'ALL', count: 0, active: true },
    { label: 'Booked', count: 0, active: false },
    { label: 'Manifested', count: 0, active: false },
    { label: 'Picked', count: 0, active: false },
    { label: 'In Transit', count: 0, active: false },
    { label: 'Dispatched', count: 0, active: false },
    { label: 'NDR', count: 0, active: false },
    { label: 'Delivered', count: 0, active: false },
    { label: 'RTO', count: 0, active: false },
    { label: 'RTS', count: 0, active: false },
    { label: 'Cancelled', count: 0, active: false },
    { label: 'Lost', count: 0, active: false }
  ];

  // Table Data
  reportData: any[] = []; // Empty for now as per image showing "No records found"
  itemsPerPageOptions = [5, 10, 20, 50];
  itemsPerPage = 5;
  searchRecords = '';

  toggleAdvanceFilters() {
    this.showAdvanceFilters = !this.showAdvanceFilters;
  }

  onTabClick(status: any) {
    this.statuses.forEach(s => s.active = false);
    status.active = true;
  }
}
