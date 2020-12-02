import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../core/response-api';

@Injectable({
  providedIn: 'root'
})
export class PessoaFisicaService {
  endpoint = 'pessoa-fisica';

  constructor(private httpClient: HttpClient) { }

  cadastrar(model: CadastrandoPessoaFisica): Observable<ResponseApi> {
    return this.httpClient.post<ResponseApi>(`${this.endpoint}/cadastrar`, model);
  }

  obterTodos(): Observable<ListaPessoaFisica[]> {
    return this.httpClient.get<ListaPessoaFisica[]>(`${this.endpoint}/obter-todos`);
  }

  obterPorId(id: number): Observable<EditandoPessoaFisica> {
    return this.httpClient.get<EditandoPessoaFisica>(`${this.endpoint}/obter/${id}`);
  }

  atualizar(model: EditandoPessoaFisica): Observable<ResponseApi> {
    return this.httpClient.put<ResponseApi>(`${this.endpoint}/editar/${model.id}`, model);
  }
}


export class CadastrandoPessoaFisica {
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  cpf: string;
}

export class EditandoPessoaFisica {
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  cpf: string;
  id: number;
}

export class ListaPessoaFisica {
  nomeCompleto: string;
  id: number;
  cpf: string;
  dataCadastro: string;
}
