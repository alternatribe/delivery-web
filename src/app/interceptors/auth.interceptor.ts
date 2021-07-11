import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const TOKEN_HEADER_KEY = 'Authorization';
const MATCH = environment.corsAuthenticationIgnore;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    if (MATCH.findIndex(e => e.includes(parseURL(authReq.url))) == -1) {
      const token = this.token.getToken();
      if (token != null) {
        authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      }
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

function parseURL(url: string): string {
  const parser = document.createElement('a');

  // Let the browser do the work
  parser.href = url;
  return parser.origin
}
