import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { Shipment } from '../models/shipment.model';
import { PageRequest, PageResult } from '../models/pagination.model';

export interface ShipmentQuery extends PageRequest {
  status?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ShipmentApiService {
  private readonly resourceUrl = '/shipments';

  constructor(private readonly api: ApiHttpService) {}

  findShipments(query: ShipmentQuery): Observable<PageResult<Shipment>> {
    const params: Record<string, string> = {
      page: String(query.page),
      size: String(query.size),
    };

    if (query.sortField) {
      params['sortField'] = query.sortField;
    }

    if (query.sortOrder != null) {
      params['sortOrder'] = String(query.sortOrder);
    }

    if (query.status) {
      params['status'] = query.status;
    }

    return this.api.get<PageResult<Shipment>>(this.resourceUrl, { params });
  }
}
