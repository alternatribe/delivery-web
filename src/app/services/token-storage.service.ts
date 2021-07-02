import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private _authenticate = new BehaviorSubject<boolean>(false);
  isAuthenticate$ = this._authenticate.asObservable();

  private _user = new BehaviorSubject<any>("");
  user$ = this._user.asObservable();

  constructor() {}

  signOut(): void {
    this._authenticate.next(false);
    this._user.next("");
    window.localStorage.clear();
    window.location.reload();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    this._authenticate.next(true);
  }

  public getToken(): string | null {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      this._authenticate.next(true);
    } else {
      this._authenticate.next(false);
    }
    return token;
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._user.next(user);
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
