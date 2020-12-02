import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppFormGroup } from '../../helpers/form.helper';

@Component({
    selector: 'app-campo-texto',
    templateUrl: './campo-texto.component.html',
    styleUrls: ['./campo-texto.component.scss']
})
export class CampoTextoComponent implements OnInit {

    @Input() descricao: string;
    @Input() nomeControle: string;
    @Input() formulario: AppFormGroup;
    @Input() mascara: string;
    @Output() alterado: EventEmitter<boolean> = new EventEmitter();
    @Output() alteradoBlur: EventEmitter<boolean> = new EventEmitter();
    @Input() tipo = 'text'
    @Input() somenteLeitura = false;

    constructor() {

    }

    ngOnInit() {
    }

    onChange() {
        this.alterado.emit();
    }

    onBlur(evento: any) {
        this.alteradoBlur.emit(evento);
    }

}
