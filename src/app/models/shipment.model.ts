export type ShipmentStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';

export interface Shipment {
  id: string;
  trackingNumber: string;
  originHub: string;
  destinationHub: string;
  status: ShipmentStatus;
  createdAt: string;
  updatedAt: string;
}

