import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reporte } from '../../../interfaces/reporte.interface';
import { ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'app-reporte-actualizar',
  templateUrl: './reporte-actualizar.component.html',
  styleUrls: ['./reporte-actualizar.component.css']
})
export class ReporteActualizarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReporteActualizarComponent>,
              @Inject(MAT_DIALOG_DATA) public reporte: Reporte,
              private reportesService: ReportesService) { }

  ngOnInit(): void {
  }

  finalizarReporte(){
    this.reportesService.editReporte(this.reporte._id, false).subscribe( resp => {
      this.dialogRef.close(resp);
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

}
