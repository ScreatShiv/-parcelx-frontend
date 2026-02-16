import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthUser } from '../models/auth.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

const MOCK_USERS: Array<{ email: string; password: string; user: AuthUser }> = [
  {
    email: 'admin@loogistic.com',
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@loogistic.com',
      name: 'Shivam Sharma',
      roles: ['SUPER_ADMIN'],
    },
  },
  {
    email: 'ops@loogistic.com',
    password: 'ops123',
    user: {
      id: '2',
      email: 'ops@loogistic.com',
      name: 'Ops User',
      roles: ['OPERATIONS'],
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  login(body: LoginRequest): Observable<LoginResponse> {
    const match = MOCK_USERS.find(
      (entry) => entry.email === body.email && entry.password === body.password,
    );

    if (!match) {
      return throwError(() => new Error('Invalid credentials'));
    }

    const response: LoginResponse = {
      accessToken: 'mock-access-token',
      user: match.user,
    };

    return of(response).pipe(delay(500));
  }
}
