import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nomeEmpresa: string = "";
  enderecoEmpresa: string = "";
  telefoneEmpresa: string = "";
  isLoggedIn: boolean = false;
  username: string = "";
  homeIsProducts: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.nomeEmpresa = environment.nomeEmpresa;
    this.enderecoEmpresa = environment.enderecoEmpresa;
    this.telefoneEmpresa = environment.telefoneEmpresa;
  }

  ngOnInit(): void {
    if (environment.startPage === 'products') {
      this.homeIsProducts = true;
    }

    if (this.authService.isLogged()) {
      this.isLoggedIn = true;
      this.username = this.authService.getUser().name;
    }

    this.authService.isAuthenticate$.subscribe(auth => {
      console.log(auth);
      this.isLoggedIn = auth;
      if (this.authService.isLogged()) {
        this.isLoggedIn = true;
        this.username = this.authService.getUser().name;
      }
    });

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("home");
  }

}
