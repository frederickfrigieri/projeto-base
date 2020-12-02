import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppFormBuilder, AppFormGroup } from 'src/app/core/helpers/form.helper';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { TokenService } from 'src/app/core/services/token.service';
import { AcessoService, Logando } from '../acesso.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: AppFormBuilder,
    private mensagemService: MensagemService,
    private acessoService: AcessoService,
    private router: Router,
    private tokenService: TokenService) { }

  formGroup: AppFormGroup;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.startForm({
      email: ['admin@porto.com.br', [Validators.required, Validators.email]],
      senha: ['123@Trocar', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  submit(): void {
    this.formGroup.showAllErrorsIfExists().subscribe(invalid => {

      if (invalid) {
        this.mensagemService.erroDeFormulario();
        return;
      }

      const model = this.formGroup.value as Logando;

      this.acessoService.logar(model).subscribe((response: any) => {
        if (response == '') {
          this.mensagemService.aviso('Email ou Senha inválidos');
          return;
        }

        this.tokenService.armazenar = response;
        this.router.navigateByUrl('bem-vindo');
      });
    });
  }

}
