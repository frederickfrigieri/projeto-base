import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  endpoint = 'acesso';

  constructor(private httpClient: HttpClient) { }

  logar(model: Logando): Observable<any> {
    console.log(model);
    return this.httpClient.post<any>(`${this.endpoint}`, model);
  }

}

export class Logando {
  email: string;
  senha: string;
}
