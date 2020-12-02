import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simOuNao'
})
export class SimOuNaoPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    value = value || '';
    return value == true ? 'Sim' : 'Não';
  }
}
