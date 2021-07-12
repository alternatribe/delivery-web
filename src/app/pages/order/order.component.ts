import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  listaPedido: Product[] = [];
  total: number = 0;

  constructor(private orderService: OrderService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.listaPedido = this.orderService.load();
    this.listaPedido.sort((a, b) => a.name.localeCompare(b.name));
    this.total = this.listaPedido.reduce((total, produto) => total + produto.unitPrice, 0);
    if (this.total === 0) {
      this.router.navigateByUrl("home");
    }
  }

  finalizar() {
    if (!this.authService.isLogged()) {
      this.router.navigateByUrl("login");
    } else {
      console.log("sending orders....");

    }
  }

  cancelar() {
    this.orderService.clear();
    this.router.navigateByUrl("home");
  }

  remover(produto: Product) {
    this.orderService.remove(produto);
    this.total = this.listaPedido.reduce((total, produto) => total + produto.unitPrice, 0);
    if (this.total === 0) {
      this.router.navigateByUrl("home");
    }
  }

}
