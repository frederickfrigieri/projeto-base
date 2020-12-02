import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppFormGroup } from '../../helpers/form.helper';

@Component({
  selector: 'app-campo-select',
  templateUrl: './campo-select.component.html',
  styleUrls: ['./campo-select.component.scss']
})
export class CampoSelectComponent implements OnInit {

  @Input() descricao: string;
  @Input() nomeControle: string;
  @Input() formulario: AppFormGroup;
  @Input() colecao: any[];
  @Input() opcaoSelecioneDoCombo = 'Selecione';
  @Output() alterado: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.alterado.emit();
  }

}
