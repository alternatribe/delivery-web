import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean  {

    if (this.authService.isLogged()) {
      return true;
    }
    this.router.navigateByUrl("login");
    return false;
  }
}
