import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(element: Heroe ): string {

    if( !element.id && element.alt_img ) {
      return 'assets/no-image.png';
    } else if (element.alt_img) {
      return element.alt_img;
    } else {
      return `assets/heroes/${ element.id }.jpg`;
    }

  }

}
