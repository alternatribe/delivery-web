import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const apiUrl = environment.mainEndpoint;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(id: string): Observable<User> {
    return this.http.get<User>(apiUrl + `/user/${id}`);
  }

  update(user: User): Observable<User> {
    return this.http.get<User>(apiUrl + `/user/${user.id}`);
    // return this.http.put<User>(`${apiUrl}/user/${id}`)
    //   .pipe((tap((data: any) => {
    //     console.log(data);

    //     this.user = helper.decodeToken(data.token);
    //     this.storageService.saveToken(data.token);
    //     this._authenticate.next(true);
    //   })));
  }
  // get(id: string): Observable<any> {
  //   return this.http.get(apiUrl + `/user/${id}`);
  //

  // update(user: User): Observable<User> {
  //   return this.http.put<User>(apiUrl + `/user/${user.id}`, user);

  // }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(apiUrl + `/user/${id}`);
  }

}
