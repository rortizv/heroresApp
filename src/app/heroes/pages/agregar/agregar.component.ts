import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      .mySave {
        background-color: #7FE861;
      }

      img {
        width: 100%;
        border-radius: 5px;
      }

      .goBack {
        background-color: #C1872E;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.MarvelComics,
    alt_img: ''
  }

  
  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }
  
  ngOnInit(): void {

    if( !this.router.url.includes('editar') ) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroById( id ) )
      )
      .subscribe( heroe => this.heroe = heroe );
  }

  save() {

    if( this.heroe.superhero.trim().length === 0  ) {
      return;
    }

    if ( this.heroe.id ) {
      // Actualizar
      this.heroesService.updateHero( this.heroe )
        .subscribe( heroe => this.showSnackbar('Registry updated'));

    } else {
      // Crear
      this.heroesService.saveHero( this.heroe )
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id ]);
          this.showSnackbar('Registry created');
        })
    }

  }

  delete() {

    const dialog = this.dialog.open( ConfirmComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {

        if( result ) {
          this.heroesService.deleteHero( this.heroe.id! )
            .subscribe( resp => {
              this.router.navigate(['/heroes']);
            });
        }
        
      }
    )

  }

  showSnackbar( mensaje: string): void {
    this.snackBar.open(mensaje, 'OK', {
      duration: 3000
    });
  }

  goBack() {
    this.router.navigate(['/heroes/listado']);
  }

}
