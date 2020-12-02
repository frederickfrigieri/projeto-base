import { Routes } from '@angular/router';
import { BemVindoComponent } from './bem-vindo/bem-vindo.component';
import { CadastroPessoaFisicaComponent } from './pessoa-fisica/cadastro-pessoa-fisica/cadastro-pessoa-fisica.component';
import { EdicaoPessoaFisicaComponent } from './pessoa-fisica/edicao-pessoa-fisica/edicao-pessoa-fisica.component';
import { ListagemPessoaFisicaComponent } from './pessoa-fisica/listagem-pessoa-fisica/listagem-pessoa-fisica.component';

export class AutenticadoRota {
    static Rotas: Routes = [
        {
            path: 'bem-vindo',
            component: BemVindoComponent
        },
        {
            path: 'pessoa-fisica',
            children: [
                {
                    path: 'novo',
                    component: CadastroPessoaFisicaComponent,
                    data: { title: 'Cadastro Pessoa Física' }
                },
                {
                    path: 'edita/:id',
                    component: EdicaoPessoaFisicaComponent,
                    data: { title: 'Edição Pessoa Física' }
                },
                {
                    path: 'lista',
                    component: ListagemPessoaFisicaComponent,
                    data: { title: 'Lista Pessoas Física' }
                },
            ]
        }];
}
