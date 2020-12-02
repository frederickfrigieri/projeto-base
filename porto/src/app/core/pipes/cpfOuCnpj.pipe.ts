import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cnpjOuCpf' })
export class CnpjOuCpfPipe implements PipeTransform {
    transform(value) {
        if (!value) {
            return value;

        } {
            const valueNaked = value.replace('.', '').replace('-', '').replace('/', '');
            const valueNakedLen = valueNaked.length;

            switch (valueNakedLen) {
                case 11:
                    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
                case 14:
                    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
                default:
                    return value;
            }
        }
    }
}