import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../core/config/app-config.token';

interface RequestOptions {
  params?: Record<string, string>;
}

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly config: AppConfig,
  ) {}

  get<T>(path: string, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(path);
    const params = this.buildParams(options?.params);
    return this.http.get<T>(url, { params });
  }

  post<TResponse, TBody>(path: string, body: TBody): Observable<TResponse> {
    const url = this.buildUrl(path);
    return this.http.post<TResponse>(url, body);
  }

  private buildUrl(path: string): string {
    const base = this.config.apiBaseUrl.replace(/\/$/, '');
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${base}/${cleanPath}`;
  }

  private buildParams(params?: Record<string, string>): HttpParams | undefined {
    if (!params) {
      return undefined;
    }
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value);
    });
    return httpParams;
  }
}
