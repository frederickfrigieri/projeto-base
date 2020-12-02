import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpRequest,
  HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MensagemService } from './mensagem.service';
import { TokenService } from './token.service';

@Injectable()
// Esse Interceptor funciona apenas para o HttpClient
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private mensagemService: MensagemService,
    private tokenService: TokenService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    const update: any = {};

    if (req.url.indexOf('http') === -1)
      update.url = `${environment.url}/${req.url}`;

    if (this.tokenService.autenticado)
      update.setHeaders = { Authorization: `Bearer ${this.tokenService.token}` };

    req = req.clone(update);
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = this.obtemErros(error);
            if (!errorMessage) {
              errorMessage = 'Algo inesperado aconteceu.';
            }
            break;
          case 401:
            errorMessage = 'Você não tem acesso a esta página';
            break;
          case 403:
            this.tokenService.encerrar();
            this.mensagemService.aviso('Sua sessão expirou, por favor, entre novamente');
            this.router.navigate(['entrar']);
            break;
          case 404:
            break;
          case 500:
            errorMessage = 'API não está ativa.';
            break;
          default:
            errorMessage = 'Algo inesperado aconteceu.';
            break;
        }
      }
      return throwError(errorMessage);
    }));
  }

  private obtemErros(response: HttpErrorResponse): string {
    if (response.error && response.error.erros) {
      const erros = [];
      response.error.erros.map((e: { message: any; }) => {
        return e.message;
      });
      return (erros.join('\n'));
    }
    return;
  }
}
