import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import type {AuthResponse, UserResponse} from '@auth/interfaces/auth-response.interface';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs';

type AuthStatus = 'checking' | 'authenticated'|'non-authenticated';
const baseUrl: string = environment.baseURl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<UserResponse|null>(null);
  private _token = signal<string|null>(null);

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking')  return 'checking';
    if (this._user()) return 'authenticated';
    return 'non-authenticated';
  });

  user = computed<UserResponse|null>(() => this._user());

  token = computed(() => this._token);

  login(email:string,password:string) {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email,
      password
    }).pipe(
      tap(resp => {
        this._authStatus.set('authenticated')
        this._user.set(resp.user);
        this._token.set(resp.token);

        localStorage.setItem('token', resp.token);
      })
    )
  }
}
