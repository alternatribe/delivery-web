import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

const apiUrl = environment.mainEndpoint;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(id: string): Observable<User> {
    return this.http.get<User>(apiUrl + `/user/${id}`);
  }

  details(id: string): Observable<User> {
    return this.http.get<User>(apiUrl + `/user/${id}/details/`);
  }

  update(user: User) {
    return this.http.put(apiUrl + `/user/`, user);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(apiUrl + `/user/${id}`);
  }

}
