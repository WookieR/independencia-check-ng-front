import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turno'
})
export class TurnoPipe implements PipeTransform {

  transform(value: string): string {
    switch (value){
      case 'TURNO_MAÑANA':
        return 'Turno mañana';

      case 'TURNO_TARDE':
        return 'Turno tarde';

      case 'TURNO_NOCHE':
        return 'Turno noche';
    }
  }

}
