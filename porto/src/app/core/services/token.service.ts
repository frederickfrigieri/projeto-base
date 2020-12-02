import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  set armazenar(token: string) {
    window.localStorage.setItem(this.chave, token);
  }

  get obter(): TokenModel {
    const token = window.localStorage.getItem(this.chave);

    if (!token) return null;
    return this.decrypt(token);
  }

  get autenticado(): boolean {
    const token = window.localStorage.getItem(this.chave);

    return token != null;
  }

  get token(): string {
    return window.localStorage.getItem(this.chave);
  }

  private decrypt(token: string): TokenModel {
    return new TokenModel(token);
  }

  encerrar(): void {
    window.localStorage.removeItem(this.chave);
  }

  private chave = 'token_porto';

}

export class TokenModel {
  constructor(public encoded: string) {
    const helper = new JwtHelperService();
    const decoded: any = helper.decodeToken(this.encoded);
    this.id = decoded.nameid;
    this.nome = decoded.unique_name;
    this.email = decoded.email
  }

  id: string;
  nome: string;
  email: string;
}