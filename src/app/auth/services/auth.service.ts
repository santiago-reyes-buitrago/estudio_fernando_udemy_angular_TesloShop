import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import type {AuthResponse, UserResponse} from '@auth/interfaces/auth-response.interface';
import {environment} from '../../../environments/environment';
import {catchError,map, Observable, of, tap} from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';

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


  checkStatusResource = rxResource(({
    stream: () => this.checkStatus()
  }))

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking')  return 'checking';
    if (this._user()) return 'authenticated';
    return 'non-authenticated';
  });

  user = computed<UserResponse|null>(() => this._user());

  token = computed(() => this._token);

  login(email:string,password:string):Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email,
      password
    }).pipe(
      map(resp => this.handleLoginSuccess(resp)),
      catchError((err:any) => this.handleLoginError(err))
    )
  }

  checkStatus():Observable<boolean>{
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map(resp => this.handleLoginSuccess(resp)),
      catchError((err:any) => this.handleLoginError(err))
    )
  }

  logout(){
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('non-authenticated');
    localStorage.removeItem('token');
  }

  private handleLoginSuccess(resp:AuthResponse) {
    this._authStatus.set('authenticated')
    this._user.set(resp.user);
    this._token.set(resp.token);
    localStorage.setItem('token', resp.token);
    return true;
  }
  private handleLoginError(err: any):Observable<boolean> {
    this.logout();
    return of(false)
  }
}
