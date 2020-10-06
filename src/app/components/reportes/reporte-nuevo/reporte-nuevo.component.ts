import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-reporte-nuevo',
  templateUrl: './reporte-nuevo.component.html',
  styleUrls: ['./reporte-nuevo.component.css']
})
export class ReporteNuevoComponent implements OnInit {

  public usuarios: Usuario[];

  public reporteForm: FormGroup;

  public turnos = [
    {
      valor: 'TURNO_MAÑANA',
      descripcion: 'Mañana'
    },
    {
      valor: 'TURNO_TARDE',
      descripcion: 'Tarde'
    },
    {
      valor: 'TURNO_NOCHE',
      descripcion: 'Noche'
    }
  ]

  constructor(public dialogRef: MatDialogRef<ReporteNuevoComponent>,
              private fb: FormBuilder,
              private reportesService: ReportesService,
              private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.reporteForm = this.fb.group({
      usuario: ['', [Validators.required], []],
      turno: ['', [Validators.required], []]
    });

    this.usuariosService.getUsuarios().subscribe( resp => {
      this.usuarios = resp;
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

  crearReporte(){
    if (this.reporteForm.invalid){
      return;
    }

    const usuario = this.reporteForm.get('usuario').value;
    const turno = this.reporteForm.get('turno').value;

    this.reportesService.newReporte(usuario, turno).subscribe( resp => {
      this.dialogRef.close(resp);
    });
  }

}
