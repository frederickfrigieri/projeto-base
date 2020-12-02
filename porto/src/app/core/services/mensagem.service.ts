import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MensagemService {

    constructor(private toastrService: ToastrService) { }

    aviso(mensagem: string): void {
        this.toastrService.warning(mensagem);
    }

    algoInesperado(): void {
        this.toastrService.warning('Algo inesperado aconteceu. Contate o helpdesk.');
    }

    public erro(texto: string): void {
        this.toastrService.error(texto);
    }

    public sucesso(texto: string): void {
        this.toastrService.success(texto);
    }

    erroDeFormulario(): void {
        this.erro('Verifique os campos em vermelho');
    }

    public erroDaApi(error: HttpErrorResponse): void {
        switch (error.status) {
            case 400:
                const erros = error.error;
                let mensagem = '';
                if (erros.message) {
                    mensagem = error.error.message;
                } else {
                    for (const key in erros) {
                        if (erros.hasOwnProperty(key)) {
                            const erro = erros[key];
                            if (erro instanceof Array) {
                                for (let index = 0; index < erro.length; index++) {
                                    const item = erro[index];
                                    mensagem += `${item}\n\n`;
                                }
                            } else {
                                mensagem += `${erro}\n\n`;
                            }
                        }
                    }
                }
                this.aviso(mensagem);
                break;
            default:
                break;
        }
        console.log(error);
    }
}
