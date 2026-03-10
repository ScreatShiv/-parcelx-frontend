import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../core/config/app-config.token';
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  data: {
    access_token: string;
    user: AuthUser;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  login(body: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.config.authUrl}/login`, body);
  }
}
