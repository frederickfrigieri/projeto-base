import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormHelper } from '../../helpers/form.helper';

@Component({
    selector: 'error-messages',
    templateUrl: './error-messages.component.html',
    styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent {

    @Input() control: FormControl;

    defaultError: string = 'Valor inválido';
    error: string;

    hasError(): boolean {
        if (FormHelper.checkShowErrorInControl(this.control)) {
            this.error = this.getFirstError();
            return true;
        }
        return false;
    }

    getFirstError() {
        for (var key in this.control.errors) {
            switch (key) {
                case 'required':
                    return 'Este campo é obrigatório';
                case 'confirmaSenha':
                    return 'A confirmação da Senha não combina com a nova senha';
                case 'email':
                    return 'E-mail inválido';
                case 'min':
                    return 'Este campo requer um valor maior que zero';
                case 'minlength':
                    return 'Este campo requer mais caracteres';
                case 'max':
                    return 'Valor máximo excedido'
                case 'maxlength':
                    return 'Este campo requer menos caracteres';
                case 'number':
                    return 'Este campo requer um número';
                case 'pattern':
                    return 'Este campo não está em um formato correto';
                case 'date':
                    return 'Este campo requer uma data';
                case 'datetime':
                    return 'Este campo requer uma datra e hora';
                case 'time':
                    return 'Este campo requer um horário';
                case 'week':
                    return 'Este campo requer uma semana';
                case 'month':
                    return 'Este campo requer um mês';
                case 'cpf':
                    return 'CPF inválido';
                case 'cnpj':
                    return 'CNPJ inválido';
                case 'zipCode':
                    return 'CEP inválido';
                case 'atLeastOneInArray':
                    return this.control.errors.atLeastOneInArray.errors;
                case 'maxDate':
                    return this.control.errors.maxDate.errors;
                case 'minDate':
                    return this.control.errors.maxDate.errors;
                case 'notContains':
                default:
                    {
                        var properties = Object.keys(this.control.errors);
                        if (properties.length == 0) return this.defaultError;

                        return this.control.errors[properties[0]].errors || this.defaultError;
                    }
            }
        }
    }

}
