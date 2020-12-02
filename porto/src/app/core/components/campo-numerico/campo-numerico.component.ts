import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppFormGroup } from '../../helpers/form.helper';

@Component({
    selector: 'app-campo-numerico',
    templateUrl: './campo-numerico.component.html',
    styleUrls: ['./campo-numerico.component.scss']
})
export class CampoNumericoComponent implements OnInit {

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

    aceitarSomenteNumeros(e: any): any {
        const keyCodes = [46, 8, 9, 27, 13, 110, 190];
        if ((keyCodes.findIndex(x => x == e.keyCode)) !== -1 ||
            // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }
}
