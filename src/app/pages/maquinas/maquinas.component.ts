import { Component, OnInit } from '@angular/core';
import { MaquinasService } from '../../services/maquinas.service';
import { Maquina } from '../../interfaces/maquina.interface';
import { AuthService } from '../../services/auth.service';

import { MatDialog } from '@angular/material/dialog';

// MODALES
import { MaquinaNuevoComponent } from '../../components/maquinas/maquina-nuevo/maquina-nuevo.component';
import { MaquinaEditarComponent } from '../../components/maquinas/maquina-editar/maquina-editar.component';
import { MaquinaBorrarComponent } from '../../components/maquinas/maquina-borrar/maquina-borrar.component';


@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.css']
})
export class MaquinasComponent implements OnInit {

  public maquinas: Maquina[];

  public breakpoint;

  public cargando: boolean;

  constructor( private maquinasService: MaquinasService, public authService: AuthService,  public dialog: MatDialog) {

    this.cargando = true;
  }

  ngOnInit(): void {
    this.cargando = true;

    this.breakpoint = (window.innerWidth <= 700) ? 1 : 3;

    this.maquinasService.getMaquinas().subscribe( maquinas => {
      this.cargando = false;
      this.maquinas = maquinas;
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 1 : 3;
  }

  nuevaMaquina(){
    const dialogRef = this.dialog.open(MaquinaNuevoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (!resp){
        return;
      }

      this.maquinas.push(resp);
    });
  }

  editarMaquina(maquina: Maquina){
    const dialogRef = this.dialog.open(MaquinaEditarComponent, {
      width: '400px',
      data: maquina
    });

    dialogRef.afterClosed().subscribe((resp: Maquina) => {
      if (!resp){
        return;
      }

      const index = this.maquinas.findIndex( maquina => maquina._id === resp._id);

      this.maquinas[index] = resp;

    });
  }

  borrarMaquina(maquina: Maquina){
    const dialogRef = this.dialog.open(MaquinaBorrarComponent, {
      width: '600px',
      data: maquina
    });

    dialogRef.afterClosed().subscribe((resp: Maquina) => {
      if (!resp){
        return;
      }

      const index = this.maquinas.findIndex( maquina => maquina._id === resp._id);

      this.maquinas.splice(index, 1);

    });

  }

}
