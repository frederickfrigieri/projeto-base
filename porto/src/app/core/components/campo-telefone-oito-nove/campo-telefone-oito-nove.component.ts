import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppFormGroup } from '../../helpers/form.helper';

@Component({
  selector: 'app-campo-telefone-oito-nove',
  templateUrl: './campo-telefone-oito-nove.component.html',
  styleUrls: ['./campo-telefone-oito-nove.component.scss']
})
export class CampoTelefoneOitoNoveComponent implements OnInit {

  @Input() descricao: string;
  @Input() nomeControle: string;
  @Input() formulario: AppFormGroup;
  @Output() alterado: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.alterado.emit();
  }


}
