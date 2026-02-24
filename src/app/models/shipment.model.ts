export type ShipmentStatus =
  | 'NOT_PICKED'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'NDR'
  | 'RETURN'
  | 'CANCELLED'
  | 'ON_PROCESS'
  | 'DRAFT';

export interface Shipment {
  id: string;
  trackingNumber: string;
  originHub: string;
  destinationHub: string;
  status: ShipmentStatus;
  createdAt: string;
  updatedAt: string;
  invoiceRef?: string;
  productDetails?: string;
  amountDetails?: string;
  pickupAddress?: string;
  consigneeAddress?: string;
  userContact?: string;
  carrier?: string;
  weightDetails?: string;
  otherDetails?: string;
  failureReason?: string;
}
