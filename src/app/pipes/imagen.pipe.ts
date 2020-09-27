import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(value: string, tipo: string): string {
    return `${ base_url }/imagen/${ tipo }/${ value }`;
  }

}
