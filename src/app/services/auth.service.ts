import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable, BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { tap } from 'rxjs/operators';

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

  constructor(private http: HttpClient, private storageService: StorageService) { }

  isLogged() {
    return (this.storageService.getToken()) ? true : false;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signin`, {
      email,
      password
    }, httpOptions)
      .pipe((tap((data: any) => {
        this.storageService.saveToken(data.accessToken);
        this.storageService.saveUser(data);
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
    return this.storageService.getUser();
  }

  getToken() {
    return this.storageService.getToken();
  }

}
