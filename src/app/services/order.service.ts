import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

const ORDER_KEY = 'order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: Product[] = [];
  private _length = new BehaviorSubject<number>(0);
  orders_length = this._length.asObservable();

  constructor() {
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
    this._length.next(0);
  }
}
