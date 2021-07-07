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

const apiUrl = environment.authEndpoint;

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _authenticate = new BehaviorSubject<boolean>(false);
  isAuthenticate$ = this._authenticate.asObservable();

  private user: User = new User();

  constructor(private http: HttpClient, private storageService: StorageService) { }

  isLogged() {
    const token = this.storageService.getToken();
    if (token && !helper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${apiUrl}/auth/signin`, {
      email,
      password
    }, httpOptions)
      .pipe((tap((data: any) => {
        this.user = helper.decodeToken(data.token);
        this.storageService.saveToken(data.token);
        this._authenticate.next(true);
      })));
  }

  logout() {
    this.storageService.signOut();
    this._authenticate.next(false);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${apiUrl}/auth/signup`, {
      name,
      email,
      password
    }, httpOptions)
      .pipe((tap((data: any) => {
        this.user = helper.decodeToken(data.token);
        this.storageService.saveToken(data.token);
        this._authenticate.next(true);
      })));
  }

  getUser() {
    const token = this.storageService.getToken();
    if (token) {
      return helper.decodeToken(token);
    }
    return null;
  }

  getToken() {
    return this.storageService.getToken();
  }

}
