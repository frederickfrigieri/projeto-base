import { Injectable } from '@angular/core';
import { FormBuilder, ValidatorFn, AsyncValidatorFn, FormGroup, AbstractControl, FormControl, FormArray, Validators, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

/**
 * Auxiliador de formulários
 */
export class FormHelper {

    /**
     * Impede de o usuário digitar letras no campo
     * @param e Evento Key Press
     */
    public static onlyNumberOnKeyPress(e) {
        let input = e.target;
        if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
            return false;
        }
    }


    /**
     * Verifica se o contém erro no controle
     * @param control Controle para verificação de erro
     */
    public static checkShowErrorInControl(control: AbstractControl): boolean {
        try {
            return control.invalid && control.touched;
        } catch (error) {
            throw new Error('AbstractControl inválido: ' + JSON.stringify(control));
        }
    }

    public static addValidation(form: FormGroup, element: string, validations: ValidatorFn[]): void {
        form.get(element).setValidators(validations);
        form.updateValueAndValidity();
    }

    public static addValidationsRequired(form: FormGroup, elements: string[]): void {
        elements.forEach(element => {
            form.get(element).setValidators([Validators.required]);
        });
        form.updateValueAndValidity();
    }

    public static addValidationsEmail(form: FormGroup, elements: string[]): void {
        elements.forEach(element => {
            form.get(element).setValidators([Validators.email, Validators.required]);
        });
        form.updateValueAndValidity();
    }


    public static removeValidation(form: FormGroup, key: string[]): void {
        key.forEach(item => {
            form.get(item).setValidators([]);
            form.get(item).patchValue(null);
            form.get(item).setErrors(null);
        });
        form.updateValueAndValidity();
    }

    public static markAllControllsAsTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                this.markAllControllsAsTouched(control);
            }
        });
    }

    public static markAllControllsAsUntouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsUntouched();

            if (control.controls) {
                this.markAllControllsAsUntouched(control);
            }
        });
    }

    public static validatorTelefone8ou9(control: AbstractControl): ValidationErrors | null {
        if (!control.value) return;
        return FormHelper.validarTelefoneGenerico(control.value, 'Telefone');
    }

    public static validatorTelefoneFixo(control: AbstractControl): ValidationErrors | null {
        if (!control.value) return;
        return FormHelper.validarTelefoneGenerico(control.value, 'Telefone');
    }

    public static validarTelefoneGenerico(valor: string, campo: string) {
        valor = valor.replace(/[^0-9]/g, '');

        if (valor.length == 10 || valor.length == 11)
            return;

        const erro = {
            telefone: {
                valid: false,
                errors: `${campo} inválido`
            }
        };

        return erro;
    }
}

export class AppFormGroup extends FormGroup {

    constructor(fg: FormGroup) {
        super(fg.controls, fg.validator, fg.asyncValidator);
    }

    /**
     *
     */
    cssClassError = 'has-error';

    /**
     * Obtem um nó de controle pelo nome
     * @param name Nome do Controle
     */
    getControl(name: string): AbstractControl | null {
        let control = this.get(name);
        if (!control) { throw new Error(`Controle inexistente: ${name}`) }
        return control;
    }

    /**
     * Adiciona a classe de erro no controle especificado
     * @param name Nome do Controle
     */
    addErrorGroup(name: string): string {
        let control = this.getControl(name);
        return this.addErrorGroupControl(control);
    }

    addErrorGroupControl(control: AbstractControl) {
        if (FormHelper.checkShowErrorInControl(control)) {
            return this.cssClassError;
        }
        return '';
    }

    /**
     * Exibe todos os erros do formulário e retorna se está válido ou não
     */
    showAllErrorsIfExists(): Observable<boolean> {
        this.validate(this.controls);
        this.updateValueAndValidity({
            emitEvent: true
        });

        return Observable.create(observer => {
            observer.next(this.invalid);
            observer.complete();
        });
    }

    private validate(controls: {
        [key: string]: AbstractControl;
    }) {
        Object.keys(controls).forEach(controlName => {
            const control = controls[controlName];

            control.markAsTouched();
            control.updateValueAndValidity({
                onlySelf: true
            });

            if (control instanceof FormGroup) {
                this.validate(control.controls);
            }

            if (control instanceof FormArray) {
                for (const key in control.controls) {
                    if (control.controls.hasOwnProperty(key)) {
                        const element = {};
                        element[key] = control.controls[key];
                        this.validate(element);
                    }
                }
            }
        });
    }
}

@Injectable()
export class AppFormBuilder extends FormBuilder {
    startForm(controlsConfig: { [key: string]: any; }, extra?: { [key: string]: any; }): AppFormGroup {
        const controls = this._reduceControls(controlsConfig);
        const validatorOrOpts: ValidatorFn = extra != null ? extra['validator'] : null;
        const asyncValidator: AsyncValidatorFn = extra != null ? extra['asyncValidator'] : null;
        const fg = new AppFormGroup(new FormGroup(controls, validatorOrOpts, asyncValidator));
        return fg;
    }

    private _reduceControls(controlsConfig: { [k: string]: any }): { [key: string]: AbstractControl } {
        const controls: { [key: string]: AbstractControl } = {};
        Object.keys(controlsConfig).forEach(controlName => {
            controls[controlName] = this._createControl(controlsConfig[controlName]);
        });
        return controls;
    }

    private _createControl(controlConfig: any): AbstractControl {
        if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup ||
            controlConfig instanceof FormArray) {
            return controlConfig;

        } else if (Array.isArray(controlConfig)) {
            const value = controlConfig[0];
            const validator: ValidatorFn = controlConfig.length > 1 ? controlConfig[1] : null;
            const asyncValidator: AsyncValidatorFn = controlConfig.length > 2 ? controlConfig[2] : null;
            return this.control(value, validator, asyncValidator);

        } else {
            return this.control(controlConfig);
        }
    }
}
