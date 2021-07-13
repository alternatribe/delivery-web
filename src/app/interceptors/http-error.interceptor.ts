import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse,) => {
          let errorMessage = '';
          console.log(error);

          if (error.status === 0 && error.name === "HttpErrorResponse" && error.statusText === "Unknown Error") {
            window.alert("Não foi possível se conectar com o servidor.\nTente novamente mais tarde!!!");
            return throwError(`Error: ${error.message}`);
          }

          // if (error.error instanceof ErrorEvent) {
          //   // client-side error
          //   errorMessage = `Error: ${error.error.message}`;
          // } else {
          //   // server-side error
          //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          // }
          // window.alert(errorMessage);
          // return throwError(errorMessage);
          return throwError(error);
        })
      )
  }
}
