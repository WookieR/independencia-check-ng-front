import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteMedidasService } from '../../services/reporte-medidas.service';
import { ReporteMaquina } from '../../interfaces/reporte-medidas.interface';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  public detalle: ReporteMaquina[];

  private reporteId: string;

  public cargando: boolean;

  constructor( private activatedRoute: ActivatedRoute, private reporteMedidasService: ReporteMedidasService ) {
    this.cargando = true;
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.reporteId = params.id;
    });

    this.reporteMedidasService.getReporteMedidas(this.reporteId).subscribe(resp => {
      this.cargando = false;
      this.detalle = resp;
    });

  }

}
