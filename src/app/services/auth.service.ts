import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable, BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.authEndpoint;

  private _authenticate = new BehaviorSubject<boolean>(false);
  isAuthenticate$ = this._authenticate.asObservable();

  private user: User = new User();

  constructor(private http: HttpClient, private storageService: StorageService, private jwtHelper: JwtHelperService) { }

  isLogged() {
    const token = this.storageService.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signin`, {
      email,
      password
    }, httpOptions)
      .pipe((tap((data: any) => {
        this.user = this.jwtHelper.decodeToken(data.token);
        this.storageService.saveToken(data.token);
        this._authenticate.next(true);
      })));
  }

  logout() {
    this.storageService.signOut();
    this._authenticate.next(false);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, {
      username,
      email,
      password
    }, httpOptions);
  }

  getUser() {
    const token = this.storageService.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  getToken() {
    return this.storageService.getToken();
  }

}
