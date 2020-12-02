import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppFormGroup } from '../../helpers/form.helper';

@Component({
  selector: 'app-campo-data',
  templateUrl: './campo-data.component.html',
  styleUrls: ['./campo-data.component.scss']
})
export class CampoDataComponent implements OnInit {

  @Input() descricao: string;
  @Input() nomeControle: string;
  @Input() formulario: AppFormGroup;
  @Output() alterado: EventEmitter<boolean> = new EventEmitter();
  @Input() somenteLeitura = false;

  constructor() { }

  ngOnInit() {
  }

  onChange()
  {
    this.alterado.emit();
  }

}
