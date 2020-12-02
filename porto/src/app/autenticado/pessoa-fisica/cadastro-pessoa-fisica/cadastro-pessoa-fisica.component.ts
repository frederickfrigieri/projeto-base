import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppFormBuilder, AppFormGroup } from 'src/app/core/helpers/form.helper';
import { ResponseApi } from 'src/app/core/response-api';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { PessoaFisicaService } from '../pessoa-fisica.service';

@Component({
  selector: 'app-cadastro-pessoa-fisica',
  templateUrl: './cadastro-pessoa-fisica.component.html',
  styleUrls: ['./cadastro-pessoa-fisica.component.scss']
})
export class CadastroPessoaFisicaComponent implements OnInit {

  constructor(private formBuilder: AppFormBuilder,
    private mensagemService: MensagemService,
    private pessoafisicaService: PessoaFisicaService) { }

  formGroup: AppFormGroup;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.startForm({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      sobrenome: [null, [Validators.required, Validators.minLength(3)]],
      cpf: [null, [Validators.required, Validators.minLength(11)]],
      dataNascimento: [null, [Validators.required, Validators.minLength(10)]]
    });
  }

  submit(): void {
    this.formGroup.showAllErrorsIfExists().subscribe(invalid => {
      if (invalid) {
        this.mensagemService.erroDeFormulario();
        return;
      }

      const model = this.formGroup.value;

      this.pessoafisicaService.cadastrar(model).subscribe((response: ResponseApi) => {
        if (response.sucesso == false) {
          this.mensagemService.erro(response.mensagensDeErro[0]);
          return;
        }

        this.mensagemService.sucesso('Cadastro realizado com sucesso.');
        this.formGroup.reset();
      });
    });

  }

}
