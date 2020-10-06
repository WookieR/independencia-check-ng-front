import { Component, OnInit } from '@angular/core';
import { Asignacion } from 'src/app/interfaces/asignacion.interface';
import { AsignacionesService } from '../../services/asignaciones.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AsignacionNuevoComponent } from '../../components/asignaciones/asignacion-nuevo/asignacion-nuevo.component';
import { AsignacionEditarComponent } from '../../components/asignaciones/asignacion-editar/asignacion-editar.component';
import { AsignacionBorrarComponent } from '../../components/asignaciones/asignacion-borrar/asignacion-borrar.component';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.css']
})
export class AsignacionesComponent implements OnInit {

  public cargando: boolean;

  public asignaciones: Asignacion[];

  constructor(private asignacionesService: AsignacionesService, public authService: AuthService, public dialog: MatDialog) {
    this.cargando = true;
  }

  ngOnInit(): void {
    this.asignacionesService.getAsignaciones().subscribe(resp => {
      this.cargando = false;
      this.asignaciones = resp;
    });
  }

  nuevaAsignacion(){
    const dialogRef = this.dialog.open(AsignacionNuevoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (!resp){
        return;
      }

      this.asignaciones.push(resp);
    });
  }

  editarAsignacion(asignacion: Asignacion){
    const dialogRef = this.dialog.open(AsignacionEditarComponent, {
      width: '400px',
      data: asignacion
    });

    dialogRef.afterClosed().subscribe((resp: Asignacion) => {
      if (!resp){
        return;
      }

      // this.obtenerSectores();
      const index = this.asignaciones.findIndex( asignacion => asignacion._id === resp._id);

      this.asignaciones[index] = resp;

    });
  }

  borrarAsignacion(asignacion: Asignacion){
    const dialogRef = this.dialog.open(AsignacionBorrarComponent, {
      width: '400px',
      data: asignacion
    });

    dialogRef.afterClosed().subscribe((resp: Asignacion) => {
      if (!resp){
        return;
      }

      const index = this.asignaciones.findIndex( item => item._id === resp._id);

      this.asignaciones.splice(index, 1);

    });
  }

}
