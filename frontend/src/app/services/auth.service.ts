import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, of } from 'rxjs';

import { AuthTokens, User } from '../models/models';
import { API } from './api.config';

const ACCESS_KEY = 'skillswap.access';
const REFRESH_KEY = 'skillswap.refresh';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  /** Reactive user signal — components can subscribe via signal(). */
  readonly user = signal<User | null>(null);

  get accessToken(): string | null {
    return localStorage.getItem(ACCESS_KEY);
  }
  get refreshToken(): string | null {
    return localStorage.getItem(REFRESH_KEY);
  }
  get isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<AuthTokens>(
      `${API}/auth/token/`, { username, password },
    ).pipe(
      tap(t => this.storeTokens(t)),

      tap(() => this.fetchMe().subscribe()),
      map(() => this.user() as User),
    );
  }

  register(payload: {
    username: string;
    password: string;
    first_name?: string;
    last_name?: string;
    bio?: string;
  }): Observable<User> {
    return this.http.post<User>(`${API}/auth/register/`, payload);
  }

  fetchMe(): Observable<User | null> {
    if (!this.accessToken) { return of(null); }
    return this.http.get<User>(`${API}/auth/me/`).pipe(
      tap(u => this.user.set(u)),
    );
  }

  /** Returns the new access token string. */
  refresh(): Observable<string> {
    return this.http.post<{ access: string }>(
      `${API}/auth/token/refresh/`,
      { refresh: this.refreshToken },
    ).pipe(
      tap(r => localStorage.setItem(ACCESS_KEY, r.access)),
      map(r => r.access),
    );
  }

  logout(): void {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    this.user.set(null);
  }

  private storeTokens(t: AuthTokens): void {
    localStorage.setItem(ACCESS_KEY, t.access);
    localStorage.setItem(REFRESH_KEY, t.refresh);
  }
}
