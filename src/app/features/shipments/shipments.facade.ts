import { Injectable, computed, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ShipmentApiService, ShipmentQuery } from '../../services/shipment-api.service';
import { Shipment, ShipmentStatus } from '../../models/shipment.model';

const MOCK_NOT_PICKED: Shipment[] = [
  {
    id: '10685802',
    trackingNumber: '7D203695172',
    originHub: 'LUDHIANA',
    destinationHub: 'BENGALURU',
    status: 'NOT_PICKED',
    createdAt: '2025-10-27T10:39:00Z',
    updatedAt: '2025-10-27T10:39:00Z',
    invoiceRef: 'ANURAG',
    productDetails: 'DOCUMENT QTY:1',
    amountDetails: '100000.00',
    pickupAddress: 'LUDHIANA, 141003',
    consigneeAddress:
      'DGFT INTEGRATED PVT LTD, 1ST/2ND FLOOR ABOVE RELIANCE TRENDS,\nNAGAR SABHANGARAR MAIN ROAD, Bengaluru - 560037',
    userContact: '8296291812',
    carrier: 'DTDC',
  },
  {
    id: '12365991',
    trackingNumber: '13630071585292',
    originHub: 'AMRITSAR',
    destinationHub: 'PUNE',
    status: 'NOT_PICKED',
    createdAt: '2025-05-16T23:47:00Z',
    updatedAt: '2025-05-16T23:47:00Z',
    invoiceRef: 'SABHDA',
    productDetails: 'DOCUMENT QTY:1',
    amountDetails: '400000.00',
    pickupAddress: 'Amritsar, 143105',
    consigneeAddress:
      'KUNAL SURAJ, CONTECH TECHNOLOGIES LLP,\nOFFICE NO-104 4TH FLOOR,\nNYATI EMPORIUM PASHAN HIGHWAY SIDE ROAD, Baner, Pune - 411045',
    userContact: '7387819676',
    carrier: 'Delivery',
  },
  {
    id: '9835849',
    trackingNumber: '13630019628700',
    originHub: 'BALLIA',
    destinationHub: 'SIKHER',
    status: 'NOT_PICKED',
    createdAt: '2024-12-23T23:53:00Z',
    updatedAt: '2024-12-23T23:53:00Z',
    invoiceRef: 'SONU',
    productDetails: 'N SKU: N',
    amountDetails: '1000000.00',
    pickupAddress: 'BALLIA, 221715',
    consigneeAddress:
      'Ziaul Haque Mazumder,\nnear Ashwini gonduanghatpur,\nBlind school land near Maharshi School Town, Silchar District, Sikher - 788005',
    userContact: '8091976001',
    carrier: 'Delivery',
  },
];

const MOCK_IN_TRANSIT: Shipment[] = [
  {
    id: '10655638',
    trackingNumber: '13630071220400',
    originHub: 'Zirakpur',
    destinationHub: 'Port Blair',
    status: 'IN_TRANSIT',
    createdAt: '2026-02-17T14:15:00Z',
    updatedAt: '2026-02-17T18:17:00Z',
    invoiceRef: 'PAWAN',
    productDetails: 'MEDICINE QTY:1',
    amountDetails: '762040.00',
    pickupAddress: 'Zirakpur, 160104',
    consigneeAddress:
      'MISSION DIRECTOR,\nANDAMAN AND NICOBAR UNION TERRITORY HEALTH MISSION OFFICE OF THE STATE HEALTH SOCIETY ATLANTA POINT PORT BLAIR, Port Blair - 744103',
    userContact: '9876025653',
    carrier: 'Delivery',
  },
];

const MOCK_OUT_FOR_DELIVERY: Shipment[] = [
  {
    id: '20455890',
    trackingNumber: '13890012340001',
    originHub: 'Mumbai',
    destinationHub: 'Thane',
    status: 'OUT_FOR_DELIVERY',
    createdAt: '2026-02-20T08:10:00Z',
    updatedAt: '2026-02-20T09:30:00Z',
    invoiceRef: 'RAHUL',
    productDetails: 'ELECTRONICS QTY:1',
    amountDetails: '2500.00',
    pickupAddress: 'Mumbai, 400001',
    consigneeAddress: 'Rahul Sharma, Ghodbunder Road, Thane West, Thane - 400607',
    userContact: '9876500012',
    carrier: 'Delivery',
  },
];

const MOCK_DELIVERED: Shipment[] = [
  {
    id: '30455891',
    trackingNumber: '13890012340002',
    originHub: 'Delhi',
    destinationHub: 'Noida',
    status: 'DELIVERED',
    createdAt: '2026-02-15T11:20:00Z',
    updatedAt: '2026-02-16T16:45:00Z',
    invoiceRef: 'MEENA',
    productDetails: 'DOCUMENT QTY:1',
    amountDetails: '500.00',
    pickupAddress: 'Delhi, 110001',
    consigneeAddress: 'Meena Verma, Sector 62, Noida - 201309',
    userContact: '9876500034',
    carrier: 'DTDC',
  },
];

const MOCK_NDR: Shipment[] = [
  {
    id: '40455892',
    trackingNumber: '13890012340003',
    originHub: 'Pune',
    destinationHub: 'Nagpur',
    status: 'NDR',
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-02-11T17:00:00Z',
    invoiceRef: 'ARJUN',
    productDetails: 'CLOTHING QTY:2',
    amountDetails: '1500.00',
    pickupAddress: 'Pune, 411001',
    consigneeAddress: 'Arjun Patil, Civil Lines, Nagpur - 440001',
    userContact: '9876500045',
    carrier: 'Delivery',
  },
];

const MOCK_RETURN: Shipment[] = [
  {
    id: '50455893',
    trackingNumber: '13890012340004',
    originHub: 'Jaipur',
    destinationHub: 'Jaipur',
    status: 'RETURN',
    createdAt: '2026-02-05T09:15:00Z',
    updatedAt: '2026-02-06T13:30:00Z',
    invoiceRef: 'NEHA',
    productDetails: 'FOOTWEAR QTY:1',
    amountDetails: '1200.00',
    pickupAddress: 'Jaipur, 302001',
    consigneeAddress: 'Neha Singh, Malviya Nagar, Jaipur - 302017',
    userContact: '9876500056',
    carrier: 'DTDC',
  },
];

const MOCK_CANCELLED: Shipment[] = [
  {
    id: '60455894',
    trackingNumber: '13890012340005',
    originHub: 'Chennai',
    destinationHub: 'Chennai',
    status: 'CANCELLED',
    createdAt: '2026-02-03T12:25:00Z',
    updatedAt: '2026-02-03T14:00:00Z',
    invoiceRef: 'SURESH',
    productDetails: 'GROCERY QTY:5',
    amountDetails: '800.00',
    pickupAddress: 'Chennai, 600001',
    consigneeAddress: 'Suresh Kumar, T Nagar, Chennai - 600017',
    userContact: '9876500067',
    carrier: 'Delivery',
  },
];

const MOCK_ON_PROCESS: Shipment[] = [
  {
    id: '70455895',
    trackingNumber: '13890012340006',
    originHub: 'Hyderabad',
    destinationHub: 'Hyderabad',
    status: 'ON_PROCESS',
    createdAt: '2026-02-21T08:00:00Z',
    updatedAt: '2026-02-21T09:00:00Z',
    invoiceRef: 'PRIYA',
    productDetails: 'BOOKS QTY:3',
    amountDetails: '900.00',
    pickupAddress: 'Hyderabad, 500001',
    consigneeAddress: 'Priya Reddy, Banjara Hills, Hyderabad - 500034',
    userContact: '9876500078',
    carrier: 'Delivery',
  },
];

const MOCK_DRAFT: Shipment[] = [
  {
    id: '80455896',
    trackingNumber: '13890012340007',
    originHub: 'Kolkata',
    destinationHub: 'Kolkata',
    status: 'DRAFT',
    createdAt: '2026-02-22T10:30:00Z',
    updatedAt: '2026-02-22T10:30:00Z',
    invoiceRef: 'ANITA',
    productDetails: 'ACCESSORIES QTY:1',
    amountDetails: '300.00',
    pickupAddress: 'Kolkata, 700001',
    consigneeAddress: 'Anita Roy, Salt Lake, Kolkata - 700091',
    userContact: '9876500089',
    carrier: 'DTDC',
  },
];

interface ShipmentsState {
  items: Shipment[];
  total: number;
  loading: boolean;
  page: number;
  size: number;
  sortField: string | null;
  sortOrder: 1 | -1 | 0;
  status: ShipmentStatus | null;
  dateType: string | null;
  fromDate: string | null;
  toDate: string | null;
  searchType: string | null;
  searchText: string;
  expressType: string | null;
  minOrderValue: number | null;
  maxOrderValue: number | null;
  zone: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ShipmentsFacade {
  private readonly state = signal<ShipmentsState>({
    items: [],
    total: 0,
    loading: false,
    page: 0,
    size: 10,
    sortField: 'createdAt',
    sortOrder: -1,
    status: null,
    dateType: 'PLACED_DATE',
    fromDate: null,
    toDate: null,
    searchType: 'TRACKING',
    searchText: '',
    expressType: null,
    minOrderValue: null,
    maxOrderValue: null,
    zone: null,
  });

  readonly vm = computed(() => this.state());

  constructor(private readonly api: ShipmentApiService) {}

  loadShipments(): void {
    const snapshot = this.state();

    if (!snapshot.status) {
      const allItems: Shipment[] = [
        ...MOCK_NOT_PICKED,
        ...MOCK_IN_TRANSIT,
        ...MOCK_OUT_FOR_DELIVERY,
        ...MOCK_DELIVERED,
        ...MOCK_NDR,
        ...MOCK_RETURN,
        ...MOCK_CANCELLED,
        ...MOCK_ON_PROCESS,
        ...MOCK_DRAFT,
      ];
      this.state.update((current) => ({
        ...current,
        items: allItems,
        total: allItems.length,
        loading: false,
      }));
      return;
    }

    if (snapshot.status === 'NOT_PICKED') {
      this.state.update((current) => ({
        ...current,
        items: MOCK_NOT_PICKED,
        total: MOCK_NOT_PICKED.length,
        loading: false,
      }));
      return;
    }

    if (snapshot.status === 'IN_TRANSIT') {
      this.state.update((current) => ({
        ...current,
        items: MOCK_IN_TRANSIT,
        total: MOCK_IN_TRANSIT.length,
        loading: false,
      }));
      return;
    }

    if (snapshot.status === 'OUT_FOR_DELIVERY') {
      this.state.update((current) => ({
        ...current,
        items: MOCK_OUT_FOR_DELIVERY,
        total: MOCK_OUT_FOR_DELIVERY.length,
        loading: false,
      }));
      return;
    }

    if (snapshot.status === 'DELIVERED') {
      this.state.update((current) => ({
        ...current,
        items: MOCK_DELIVERED,
        total: MOCK_DELIVERED.length,
        loading: false,
      }));
      return;
    }

    if (snapshot.status === 'NDR') {
      this.state.update((current) => ({
        ...current,
        items: MOCK_NDR,
        total: MOCK_NDR.length,
        loading: false,
      }));
      return;
    }

    if (snapshot.status === 'RETURN') {
      this.state.update((current) => ({
        ...current,
        items: MOCK_RETURN,
        total: MOCK_RETURN.length,
        loading: false,
      }));
      return;
    }

    if (snapshot.status === 'CANCELLED') {
      this.state.update((current) => ({
        ...current,
        items: MOCK_CANCELLED,
        total: MOCK_CANCELLED.length,
        loading: false,
      }));
      return;
    }

    if (snapshot.status === 'ON_PROCESS') {
      this.state.update((current) => ({
        ...current,
        items: MOCK_ON_PROCESS,
        total: MOCK_ON_PROCESS.length,
        loading: false,
      }));
      return;
    }

    if (snapshot.status === 'DRAFT') {
      this.state.update((current) => ({
        ...current,
        items: MOCK_DRAFT,
        total: MOCK_DRAFT.length,
        loading: false,
      }));
      return;
    }

    const query: ShipmentQuery = {
      page: snapshot.page,
      size: snapshot.size,
      sortField: snapshot.sortField,
      sortOrder: snapshot.sortOrder,
      status: snapshot.status,
      dateType: snapshot.dateType,
      fromDate: snapshot.fromDate,
      toDate: snapshot.toDate,
      searchType: snapshot.searchType,
      searchText: snapshot.searchText || null,
      expressType: snapshot.expressType,
      minOrderValue: snapshot.minOrderValue,
      maxOrderValue: snapshot.maxOrderValue,
      zone: snapshot.zone,
    };

    this.state.update((current) => ({ ...current, loading: true }));

    this.api
      .findShipments(query)
      .pipe(
        finalize(() => {
          this.state.update((current) => ({ ...current, loading: false }));
        }),
      )
      .subscribe((result) => {
        this.state.update((current) => ({
          ...current,
          items: result.items,
          total: result.total,
        }));
      });
  }

  changePage(page: number, size: number): void {
    this.state.update((current) => ({
      ...current,
      page,
      size,
    }));
    this.loadShipments();
  }

  changeSort(sortField: string, sortOrder: 1 | -1 | 0): void {
    this.state.update((current) => ({
      ...current,
      sortField,
      sortOrder,
    }));
    this.loadShipments();
  }

  changeStatusFilter(status: ShipmentStatus | null): void {
    this.state.update((current) => ({
      ...current,
      status,
      page: 0,
    }));
    this.loadShipments();
  }

  applyFilters(filters: {
    dateType?: string | null;
    fromDate?: string | null;
    toDate?: string | null;
    searchType?: string | null;
    searchText?: string;
    expressType?: string | null;
    minOrderValue?: number | null;
    maxOrderValue?: number | null;
    zone?: string | null;
  }): void {
    this.state.update((current) => ({
      ...current,
      ...filters,
      page: 0,
    }));
    this.loadShipments();
  }
}
