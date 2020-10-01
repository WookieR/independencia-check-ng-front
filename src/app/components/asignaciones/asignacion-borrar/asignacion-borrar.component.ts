import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Asignacion } from '../../../interfaces/asignacion.interface';
import { AsignacionesService } from '../../../services/asignaciones.service';

@Component({
  selector: 'app-asignacion-borrar',
  templateUrl: './asignacion-borrar.component.html',
  styleUrls: ['./asignacion-borrar.component.css']
})
export class AsignacionBorrarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AsignacionBorrarComponent>,
              @Inject(MAT_DIALOG_DATA) public asignacion: Asignacion,
              private asignacionesService: AsignacionesService) { }

  ngOnInit(): void {
  }

  eliminarAsignacion(){
    this.asignacionesService.deleteAsignacion(this.asignacion).subscribe( resp => {
      this.dialogRef.close(resp);
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

}
