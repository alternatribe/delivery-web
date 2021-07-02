import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  username: string = "";
  homeIsProducts: boolean = false;

  constructor(private token: TokenStorageService) {}

  ngOnInit(): void {
    if (environment.startPage === 'products') {
      this.homeIsProducts = true;
    }

    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.username = this.token.getUser().name;
    }

    this.token.isAuthenticate$.subscribe(auth => {
      this.isLoggedIn = auth;
      this.username = this.token.getUser().name;
    });

    this.token.user$.subscribe(user => {
      if (user) {
        this.username = user.name;
      }
    });
  }

  logout() {
    this.token.signOut();
  }

}
