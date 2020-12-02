import { AppFormGroup } from './../../helpers/form.helper';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-campo-checkbox',
  templateUrl: './campo-checkbox.component.html',
  styleUrls: ['./campo-checkbox.component.scss']
})
export class CampoCheckboxComponent implements OnInit {

  @Input() descricao: string;
  @Input() colecao: any[] = [];
  @Input() formulario: AppFormGroup;
  @Input() nomeControle: string;
  @Output() alterado: EventEmitter<boolean> = new EventEmitter();
  @Output() onSelecionados = new EventEmitter();

  @Input() listaDosSelecionados = [];

  constructor() { }

  ngOnInit() {
  }

  onClicou(evento: any): void {
    const valor = evento.value;
    const selecionado = evento.checked;

    selecionado ? this.adicionarSelecionado(valor) : this.removerSelecionado(valor);
    
    this.onSelecionados.emit(this.listaDosSelecionados.join(','));
  }

  private adicionarSelecionado(valor: number) {
    if (this.listaDosSelecionados.find(x => x == valor) == null)
      this.listaDosSelecionados.push(valor);
  }

  private removerSelecionado(valor: number) {
    this.listaDosSelecionados = this.listaDosSelecionados.filter(x => x != valor);
  }

  onChange() {
    this.alterado.emit();
  }
}
