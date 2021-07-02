import { Usuario } from './models/usuario.model';
import { Observable } from 'rxjs';
import { StorageService } from './services/storage/storage.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Component } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'delivery-web';
  isLogged$!: Observable<boolean>;
  user: Usuario = new Usuario;

  constructor(
    private auth: AuthService,
    private router: Router,
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  async initializeApp() {

    await this.storage.init();
    await this.auth.init();

    this.auth.authenticationState$.subscribe(autenticado => {
      if (!autenticado && !this.router.url.endsWith('/') && !this.router.url.endsWith('/products') && !this.router.url.endsWith('/about') && !this.router.url.endsWith('/home') && !this.router.url.endsWith('/login')) {
        this.logout();
      }
    });

  }

  ngOnInit() {
    this.isLogged$ = this.auth.isAuthenticated();
    console.log("----> ", this.auth.userData);
    this.user = this.auth.userData;
  }

  logout() {
    this.router.navigateByUrl("login");
  }
}
