import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, catchError } from 'rxjs/operators';

const ORDER_KEY = 'order';
const apiUrl = environment.mainEndpoint;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: Product[] = [];
  private _length = new BehaviorSubject<number>(0);
  orders_length = this._length.asObservable();

  constructor(private http: HttpClient) {
    this._length.next(this.load().length);
  }

  load(): Product[] {
    let order = window.sessionStorage.getItem(ORDER_KEY);
    if (order) {
      this.orders = JSON.parse(order);
    }
    return this.orders;
  }

  add(produto: Product) {
    this.load();
    this.orders.push(produto);
    this._length.next(this.orders.length);
    window.sessionStorage.setItem(ORDER_KEY, JSON.stringify(this.orders));
  }

  remove(produto: Product) {
    let index = this.orders.indexOf(produto);
    this.orders.splice(index-1,1);
    this._length.next(this.orders.length);
    window.sessionStorage.setItem(ORDER_KEY, JSON.stringify(this.orders));
  }

  clear() {
    window.sessionStorage.removeItem(ORDER_KEY);
    this.orders = [];
    this._length.next(this.orders.length);
  }


  recorder(id: string, order: Product[]): Observable<any> {
    return this.http.post(apiUrl + `/order/${id}`, order, httpOptions)
      .pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err);
          return throwError(err);
        })
      );
  }

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + `/product/`);
  }


}
