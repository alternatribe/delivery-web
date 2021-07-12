import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { RoleEnum } from './models/role.enum';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  nomeEmpresa: string = "";
  enderecoEmpresa: string = "";
  telefoneEmpresa: string = "";
  isLoggedIn: boolean = false;
  homeIsProducts: boolean = false;

  username: string = "";
  orders: number = 0;

  authInscription: Subscription = new Subscription;
  orderInscription: Subscription = new Subscription;

  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) {
    this.nomeEmpresa = environment.nomeEmpresa;
    this.enderecoEmpresa = environment.enderecoEmpresa;
    this.telefoneEmpresa = environment.telefoneEmpresa;
  }

  ngOnDestroy(): void {
    this.authInscription.unsubscribe();
    this.orderInscription.unsubscribe();
  }

  ngOnInit(): void {
    if (environment.startPage === 'products') {
      this.homeIsProducts = true;
    }

    if (this.authService.isLogged()) {
      this.isLoggedIn = true;
      this.username = this.authService.getUser().name;
    }

    this.authInscription = this.authService.isAuthenticate$.subscribe(auth => {
      this.isLoggedIn = auth;
      if (this.authService.isLogged()) {
        this.isLoggedIn = true;
        this.username = this.authService.getUser().name;
      }
    });

    this.orderInscription = this.orderService.orders_length.subscribe(length => {
      this.orders = length;
    });

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("home");
  }

  isClient() {
    return this.authService.getUser().role === RoleEnum.ROLE_CLIENT;
  }

}
