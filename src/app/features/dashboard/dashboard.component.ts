import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    FormsModule, 
    ButtonModule, 
    DatePickerModule,
    BaseChartDirective
  ]
})
export class DashboardComponent {
  tabs = [
    { label: 'Overview', id: 'overview' },
    { label: 'Date Wise Shipment', id: 'date_wise' },
    { label: 'Product Wise Shipment', id: 'product_wise' }
  ];
  activeTab = this.tabs[0];

  dateRange: Date[] | undefined;

  statsCards = [
    { label: 'Total Processed', count: 10, icon: 'pi pi-clone', color: 'orange' },
    { label: 'Picked', count: 0, icon: 'pi pi-box', color: 'orange' },
    { label: 'In-Transit', count: 2, icon: 'pi pi-truck', color: 'orange' },
    { label: 'Out for Delivery', count: 0, icon: 'pi pi-send', color: 'orange' },
    { label: 'Delivered', count: 7, icon: 'pi pi-check-circle', color: 'orange' },
    { label: 'RTO', count: 1, icon: 'pi pi-replay', color: 'orange' },
    { label: 'Not Picked', count: 0, icon: 'pi pi-clock', color: 'yellow' },
    { label: 'Cancelled', count: 3, icon: 'pi pi-times-circle', color: 'red' },
    { label: 'Failed', count: 3, icon: 'pi pi-exclamation-triangle', color: 'orange' }
  ];

  // Doughnut Chart
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    cutout: '60%'
  };
  public doughnutChartLabels: string[] = ['Delivered', 'Live Shipments', 'RTO'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data: [7, 2, 1],
        backgroundColor: ['#16a34a', '#fcd34d', '#ef4444'],
        hoverBackgroundColor: ['#15803d', '#fbbf24', '#dc2626'],
        borderWidth: 0
      }
    ]
  };
  public doughnutChartType: 'doughnut' = 'doughnut';

  // Line Chart
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [
      {
        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        label: 'Shipment Count',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        borderColor: '#16a34a',
        pointBackgroundColor: '#16a34a',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#16a34a',
        fill: 'origin',
        tension: 0.4
      }
    ],
    labels: ['27 Jan', '28 Jan', '29 Jan', '30 Jan', '31 Jan', '01 Feb', '02 Feb', '03 Feb', '11 Feb', '12 Feb', '17 Feb', '23 Feb']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          stepSize: 1
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };
  public lineChartType: 'line' = 'line';

  // Shipment Type Chart
  public shipmentTypeChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    cutout: '60%'
  };
  public shipmentTypeChartData: ChartData<'doughnut'> = {
    labels: ['Prepaid', 'COD', 'Reverse'],
    datasets: [
      { 
        data: [10, 0, 0],
        backgroundColor: ['#0f2e5d', '#3b82f6', '#93c5fd'],
        hoverBackgroundColor: ['#0f2e5d', '#3b82f6', '#93c5fd'],
        borderWidth: 0
      }
    ]
  };

  // TAT Chart
  public tatChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    cutout: '70%'
  };
  public tatChartData: ChartData<'doughnut'> = {
    labels: ['Within TAT', 'Outside TAT'],
    datasets: [
      { 
        data: [6, 1],
        backgroundColor: ['#22c55e', '#e5e7eb'],
        hoverBackgroundColor: ['#16a34a', '#d1d5db'],
        borderWidth: 0
      }
    ]
  };

  // NDR Report Chart (Horizontal Bar)
  public ndrChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { stepSize: 1 }
      },
      y: {
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };
  public ndrChartData: ChartData<'bar'> = {
    labels: ['RTO', 'Delivered'],
    datasets: [
      {
        data: [1.2, 2],
        backgroundColor: ['#ef4444', '#22c55e'],
        barThickness: 20,
        borderRadius: 4
      }
    ]
  };
  public ndrChartType: 'bar' = 'bar';

  // Zone Wise Shipments Chart (Bar)
  public zoneChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 7,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          stepSize: 1
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: () => '',
          label: (context) => {
            const value = context.raw as number;
            const zoneShare = value === 3 ? '75%' : '25%';
            const ppd = value === 3 ? '3 (100%)' : '1 (100%)';
            const courier = value === 3 ? 'Delhivery: 3' : 'Delhivery: 1';
            
            return [
              `Total Shipments: ${value}`,
              `Zone Share: ${zoneShare}`,
              `COD: 0 (0%)`,
              `PPD: ${ppd}`,
              ``,
              `Courier Breakdown:`,
              `${courier}`
            ];
          }
        }
      }
    }
  };

  public zoneChartData: ChartData<'bar'> = {
    labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E', 'Zone F'],
    datasets: [
      {
        data: [0, 0, 0, 1, 3, 0],
        backgroundColor: '#16a34a',
        hoverBackgroundColor: '#15803d',
        barThickness: 30,
        borderRadius: 4
      }
    ]
  };
  public zoneChartType: 'bar' = 'bar';

  // Logistics Data
  logisticsData = [
    {
      courierName: 'Delhivery',
      totalShipment: { value: 7, percentage: 70 },
      picked: { value: 0, percentage: 0 },
      inTransit: { value: 0, percentage: 0 },
      ndr: { value: 0, percentage: 0 },
      delivered: { value: 4, percentage: 57.14 },
      rto: { value: 1, percentage: 14.29 },
      prepaidPercentage: 100
    },
    {
      courierName: 'DTDC',
      totalShipment: { value: 3, percentage: 30 },
      picked: { value: 0, percentage: 0 },
      inTransit: { value: 0, percentage: 0 },
      ndr: { value: 0, percentage: 0 },
      delivered: { value: 3, percentage: 100 },
      rto: { value: 0, percentage: 0 },
      prepaidPercentage: 100
    }
  ];

  // Order Distribution Chart (Horizontal Line)
  public orderDistributionChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 3,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          stepSize: 1
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 8,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: (context) => {
            return `${context.raw} Orders`;
          }
        }
      }
    }
  };

  public orderDistributionChartData: ChartData<'line'> = {
    labels: ['795001', '791111', '744103', '731216', '600581', '670101', '581401', '134116', '782140'],
    datasets: [
      {
        data: [1, 1, 1, 1, 1, 1, 1, 1, 2],
        label: 'Orders',
        borderColor: '#555555',
        backgroundColor: 'rgba(255, 241, 242, 0.6)', // light red fill
        pointBackgroundColor: '#333333',
        pointBorderColor: '#333333',
        pointHoverBackgroundColor: '#000000',
        pointHoverBorderColor: '#000000',
        fill: 'origin',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };
  public orderDistributionChartType: 'line' = 'line';

  // Total Revenue Chart (Bar)
  public revenueChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          callback: (value) => '₹' + value,
          stepSize: 200
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => '₹' + context.raw
        }
      }
    }
  };
  public revenueChartData: ChartData<'bar'> = {
    labels: ['JAN 26', 'FEB 26'],
    datasets: [
      {
        data: [1600, 800],
        backgroundColor: '#0f2e5d',
        hoverBackgroundColor: '#0f2e5d',
        barThickness: 60,
        borderRadius: 4,
        label: 'Prepaid'
      },
      {
        data: [0, 0],
        backgroundColor: '#3b82f6',
        hoverBackgroundColor: '#3b82f6',
        barThickness: 60,
        borderRadius: 4,
        label: 'COD'
      }
    ]
  };
  public revenueChartType: 'bar' = 'bar';

  // Top Products Data
  topProducts = [
    { name: 'MEDICINE', order: 6, revenue: '₹1,38,978' },
    { name: 'GARMENTS', order: 1, revenue: '₹10,000' }
  ];

  // Top Customers Data
  topCustomers = [
    { name: 'Blink Swag India', order: 1, revenue: '₹10,000' },
    { name: 'DRUG AND DOSES...', order: 1, revenue: '₹14,858' },
    { name: 'JIBANREKHA PHARMACY', order: 1, revenue: '₹2,897' },
    { name: 'MISSION DIRECTOR', order: 1, revenue: '₹76,224' },
    { name: 'S A INTERPRISES...', order: 1, revenue: '₹30,000' }
  ];

  onTabChange(tab: any) {
    this.activeTab = tab;
  }
}
