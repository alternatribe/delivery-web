import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);

  }

  public getToken(): string | null {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token !== null) {
      const tokenArray = token.split('.');
      if (tokenArray.length !== 3) {
        return null;
      }
    }
    return token;
  }

}
