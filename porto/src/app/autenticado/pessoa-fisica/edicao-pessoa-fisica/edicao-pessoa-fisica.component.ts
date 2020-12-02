import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppFormBuilder, AppFormGroup } from 'src/app/core/helpers/form.helper';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { EditandoPessoaFisica, PessoaFisicaService } from '../pessoa-fisica.service';

@Component({
  selector: 'app-edicao-pessoa-fisica',
  templateUrl: './edicao-pessoa-fisica.component.html',
  styleUrls: ['./edicao-pessoa-fisica.component.scss']
})
export class EdicaoPessoaFisicaComponent implements OnInit {

  formGroup: AppFormGroup;

  constructor(private formBuilder: AppFormBuilder,
    private pessoaFisicaService: PessoaFisicaService,
    private route: ActivatedRoute,
    private mensagemService: MensagemService,
    private navigate: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.startForm({
      nome: [null, [Validators.required]],
      sobrenome: [null, [Validators.required]],
      cpf: [null, Validators.required],
      dataNascimento: [null, [Validators.required]],
      id: [null, [Validators.required]]
    });


    this.route.paramMap.subscribe(paramMap => {
      const id = parseInt(paramMap.get('id'));

      this.pessoaFisicaService.obterPorId(id).subscribe((response: EditandoPessoaFisica) => {
        this.formGroup.patchValue(response);
      });
    });
  }

  submit(): void {
    this.formGroup.showAllErrorsIfExists().subscribe(invalid => {
      if (invalid) {
        this.mensagemService.erroDeFormulario();
        return;
      }
      this.pessoaFisicaService.atualizar(this.formGroup.value).subscribe(response => {
        if (response.sucesso == false) {
          this.mensagemService.erro(response.mensagensDeErro[0]);
          return;
        }
        this.mensagemService.sucesso('Cadastro atualizado com sucesso.');
        this.navigate.navigateByUrl('pessoa-fisica/lista');
      });
    });
  }

}
