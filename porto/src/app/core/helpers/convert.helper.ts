import 'moment/locale/pt-br';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export class ConvertHelper {
    public static toDate(ddMMYYY: string | Date) {
        return moment(ddMMYYY, 'DD/MM/YYYY').toDate();
    }

    public static toOnlyNumbers(value: string) {
        return value.replace(/[^0-9]/g, '');
    }

    public static objectToParams(value: object): HttpParams {
        let params = new HttpParams();

        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                const element = value[key];

                if (element == null) continue;

                if (element instanceof Array) {
                    element.forEach(x => {
                        params = params.append(key, x);
                    });
                }
                else {
                    params = params.append(key, element);
                }
            }
        }

        return params;
    }

    public static toDateTimeToJson(date: string | Date, hour: string): string {
        const data: Date = this.toDate(date);
        const hora: string[] = hour.split(':');
        const dataCompleta = new Date(data.getFullYear(),
            data.getMonth(), data.getDate(), parseInt(hora[0]), parseInt(hora[1]), 0, 0);

        return moment(dataCompleta).toJSON();
    }

    public static formatDate(date): string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }
}