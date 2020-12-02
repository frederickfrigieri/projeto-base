import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {
  }

  sair(): void {
    this.tokenService.encerrar();
    this.router.navigate(['entrar']);
  }
}
