import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-bem-vindo',
  templateUrl: './bem-vindo.component.html',
  styleUrls: ['./bem-vindo.component.scss']
})
export class BemVindoComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  nome = '';

  ngOnInit(): void {
    this.nome = this.tokenService.obter.nome;
  }

}
