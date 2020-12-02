import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { AppFormGroup } from '../../helpers/form.helper';

@Component({
    selector: 'app-campo-texto-ac',
    templateUrl: './campo-texto-ac.component.html',
    styleUrls: ['./campo-texto-ac.component.scss']
})
export class CampoTextoACComponent implements OnInit {

    @Input() descricao: string;
    @Input() nomeControle: string;
    @Input() formulario: AppFormGroup;
    @Output() alterado: EventEmitter<any> = new EventEmitter();
    @Output() alteradoBlur: EventEmitter<boolean> = new EventEmitter();
    @Input() tipo = 'text';
    @Input() colecao: any[] = [];

    constructor() { }

    ngOnInit(): void { }

    onChange(): void {
        this.alterado.emit();
    }

    typeaheadOnSelect(e: TypeaheadMatch): void {
        this.alterado.emit(e.value);
    }
}
