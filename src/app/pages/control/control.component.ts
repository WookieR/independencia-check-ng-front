import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteMedidasService } from '../../services/reporte-medidas.service';
import { ReporteMaquina } from '../../interfaces/reporte-medidas.interface';

// PDF
import { PdfMakeWrapper, Table, Txt, Stack, Ul, Cell } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';

PdfMakeWrapper.setFonts(pdfFonts);

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

  generarPdf(maquina: ReporteMaquina){

    const pdf = new PdfMakeWrapper();

    const texto = new Txt(maquina.nombre).margin([10, 0, 0, 10]).bold().fontSize(20).end;

    pdf.add(texto);

    maquina.sectores.forEach(sector => {
      pdf.add(new Ul([sector.nombre]).end);
      sector.items.forEach(item => {

        const valores: any[] = [];

        valores.push([
          new Cell( new Txt(`${item.nombre}`).bold().end ).colSpan(2).end,
          new Cell( new Txt(`Valor`).bold().end ).bold().end
        ]);

        item.medidas.forEach(medida => {
          valores.push([`${medida.itemCategoria.nombre}`, `${medida.valor}`]);
        });

        console.log(valores);

        const tabla = new Table( valores
          // [new Txt(`${item.nombre}`).bold().end, new Txt(`Valor`).bold().end],
          // ['', '']
        ).widths(['*', 250]).margin([20, 10, 0, 10]).end;

        pdf.add(tabla);

      });
    });

    pdf.create().open();

  }

}
