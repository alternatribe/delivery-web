import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModalService } from '../../share/modal/modal.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy{

  listaPedido: Product[] = [];
  total: number = 0;
  orderInscription: Subscription = new Subscription;

  constructor(private orderService: OrderService, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute, private modalService: ModalService) { }

  ngOnDestroy(): void {
    this.orderInscription.unsubscribe();
  }

  ngOnInit(): void {
    this.listaPedido = this.orderService.load();
    this.listaPedido.sort((a, b) => a.name.localeCompare(b.name));
    this.total = this.listaPedido.reduce((total, produto) => total + produto.unitPrice, 0);
    if (this.total === 0) {
      this.router.navigateByUrl("home");
    }
    this.orderInscription = this.activatedRoute.queryParams.subscribe(
      (queryParams: any) => {
        let param = queryParams['finalize'];
        if (param) {
          this.finalizar();
        }
      }
    )
  }

  finalizar() {
    if (!this.authService.isLogged()) {
      this.router.navigate(["login"], {queryParams: {'refresh': 'order'}});
    } else {
      this.orderService.recorder(this.authService.getUser().id, this.listaPedido)
        .subscribe(
          () => window.alert("Pedido realizado com sucesso!!!")
        );
      this.cancelar();
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
