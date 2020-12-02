import { Component, OnInit } from '@angular/core';
import { ListaPessoaFisica, PessoaFisicaService } from '../pessoa-fisica.service';

@Component({
  selector: 'app-listagem-pessoa-fisica',
  templateUrl: './listagem-pessoa-fisica.component.html',
  styleUrls: ['./listagem-pessoa-fisica.component.scss']
})
export class ListagemPessoaFisicaComponent implements OnInit {

  constructor(private pessoaFisicaService: PessoaFisicaService) { }

  pessoas: ListaPessoaFisica[] = [];

  ngOnInit(): void {
    this.pessoaFisicaService.obterTodos().subscribe(response => {
      this.pessoas = response;
    })
  }

}
