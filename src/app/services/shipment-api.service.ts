import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { Shipment } from '../models/shipment.model';
import { PageRequest, PageResult } from '../models/pagination.model';

export interface ShipmentQuery extends PageRequest {
  status?: string | null;
  dateType?: string | null;
  fromDate?: string | null;
  toDate?: string | null;
  searchType?: string | null;
  searchText?: string | null;
  expressType?: string | null;
  minOrderValue?: number | null;
  maxOrderValue?: number | null;
  zone?: string | null;
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

    if (query.dateType) {
      params['dateType'] = query.dateType;
    }

    if (query.fromDate) {
      params['fromDate'] = query.fromDate;
    }

    if (query.toDate) {
      params['toDate'] = query.toDate;
    }

    if (query.searchType) {
      params['searchType'] = query.searchType;
    }

    if (query.searchText) {
      params['searchText'] = query.searchText;
    }

    if (query.expressType) {
      params['expressType'] = query.expressType;
    }

    if (query.minOrderValue != null) {
      params['minOrderValue'] = String(query.minOrderValue);
    }

    if (query.maxOrderValue != null) {
      params['maxOrderValue'] = String(query.maxOrderValue);
    }

    if (query.zone) {
      params['zone'] = query.zone;
    }

    return this.api.get<PageResult<Shipment>>(this.resourceUrl, { params });
  }
}
