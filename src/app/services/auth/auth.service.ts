import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { Usuario } from 'src/app/models/usuario.model';

const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.authEndpoint;
  private authenticationStateSource = new BehaviorSubject<boolean>(false);
  authenticationState$ = this.authenticationStateSource.asObservable();
  private user: Usuario = new Usuario();

  constructor(private http: HttpClient,
    private storage: StorageService,
    private jwtHelper: JwtHelperService) { }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  private async _getAuthorizationHeader(response: any) {
    console.log(response);
    const token = response.headers.get('authorization').split(' ')[1];
    await this.storage.set(TOKEN_KEY, token);
    this.user = this.jwtHelper.decodeToken(token);
    this.authenticationStateSource.next(true);
  }

  login(email: string, senha: string) {
    console.log(`${this.apiUrl}/auth/signin`);

    return this.http.post(`${this.apiUrl}/auth/signin`, { email: email, password: senha }, { observe: 'response' })
      .pipe(
        switchMap(response => this._getAuthorizationHeader(response)),
        catchError(error => this.handleError(error))
      );
  }

  async logout() {
    await this.storage.remove(TOKEN_KEY);
    this.authenticationStateSource.next(false);
  }

  async init(): Promise<void> {
    return this.storage.get(TOKEN_KEY).then(token => {
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        this.user = this.jwtHelper.decodeToken(token);
        console.log('user:', this.user);
        this.authenticationStateSource.next(true);
        console.log(JSON.stringify(this.user));
      } else {
        this.user = new Usuario();
        this.authenticationStateSource.next(false);
      }
      return;
    });
  }

  retoken() {
    return this.http.get(`${this.apiUrl}/auth/refresh_token`, { observe: 'response' })
      .pipe(
        switchMap(response => this._getAuthorizationHeader(response)),
        catchError(error => this.handleError(error))
      );
  }

  isAuthenticated() {
    return this.authenticationStateSource.asObservable();
  }

  get userData() {
    console.log("user", this.user);
    return this.user;
  }
}
