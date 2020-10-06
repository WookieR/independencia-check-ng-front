import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';
import { Reporte } from '../../interfaces/reporte.interface';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ReporteNuevoComponent } from '../../components/reportes/reporte-nuevo/reporte-nuevo.component';
import { ReporteActualizarComponent } from '../../components/reportes/reporte-actualizar/reporte-actualizar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public cargando: boolean;

  public reportes: Reporte[];

  constructor(private reportesService: ReportesService,
              public authService: AuthService,
              public dialog: MatDialog,
              private router: Router) {
    this.cargando = true;
  }

  ngOnInit(): void {
    this.reportesService.getReportes().subscribe(resp => {
      this.cargando = false;
      this.reportes = resp;
    });
  }

  nuevoReporte(){
    const dialogRef = this.dialog.open(ReporteNuevoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (!resp){
        return;
      }

      this.reportes.push(resp);
    });
  }

  actualizarReporte(reporte: Reporte){
    const dialogRef = this.dialog.open(ReporteActualizarComponent, {
      width: '400px',
      data: reporte
    });

    dialogRef.afterClosed().subscribe((resp: Reporte) => {
      if (!resp){
        return;
      }


      // this.obtenerSectores();
      const index = this.reportes.findIndex( usuario => usuario._id === resp._id);

      this.reportes[index] = resp;

    });
  }

  verDetalles(reporteId: string){
    this.router.navigateByUrl(`/control/${reporteId}`);
  }

}
