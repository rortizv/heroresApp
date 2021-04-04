import { Pipe, PipeTransform } from '@angular/core';
import { element } from 'protractor';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(element: Heroe ): string {
    return `assets/heroes/${element.id}.jpg`;
  }

}
