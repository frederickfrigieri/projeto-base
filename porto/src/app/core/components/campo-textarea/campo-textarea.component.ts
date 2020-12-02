import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppFormGroup } from '../../helpers/form.helper';

@Component({
    selector: 'app-campo-textarea',
    templateUrl: './campo-textarea.component.html',
    styleUrls: ['./campo-textarea.component.scss']
})
export class CampoTextareaComponent implements OnInit {

    @Input() descricao: string;
    @Input() nomeControle: string;
    @Input() formulario: AppFormGroup;
    @Input() mascara: string;
    @Output() alterado: EventEmitter<boolean> = new EventEmitter();

    constructor() {

    }

    ngOnInit() {
    }

    onChange() {
        this.alterado.emit();
    }

}
