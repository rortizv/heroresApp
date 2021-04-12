import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { element } from 'protractor';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
  mat-card {
    margin-top: 20px;
  }

  .myEdit {
    background-color: #61A4E8;
  }
`]
})
export class HeroeTarjetaComponent {

 @Input() element!: Heroe;

}
