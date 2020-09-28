import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaquinasService } from '../../../services/maquinas.service';
import { SectoresService } from '../../../services/sectores.service';
import { Maquina } from '../../../interfaces/maquina.interface';

@Component({
  selector: 'app-sector-nuevo',
  templateUrl: './sector-nuevo.component.html',
  styleUrls: ['./sector-nuevo.component.css']
})
export class SectorNuevoComponent implements OnInit {

  public sectorForm: FormGroup;

  public maquinas: Maquina[];

  constructor( public dialogRef: MatDialogRef<SectorNuevoComponent>,
               private fb: FormBuilder,
               private maquinasService: MaquinasService,
               private sectoresService: SectoresService) { }

  ngOnInit(): void {
    this.sectorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)], []],
      maquina: ['', [Validators.required], []],
      imagen: ['', [Validators.required], []]
    });

    this.maquinasService.getMaquinas().subscribe(resp => {
      this.maquinas = resp;
    });
  }

  async crearSector(){
    if (this.sectorForm.invalid){
      return;
    }

    const nombre = this.sectorForm.get('nombre').value;
    const maquina = this.sectorForm.get('maquina').value;
    const imagen: File = this.sectorForm.get('imagen').value.files[0];

    const resp = await this.sectoresService.newSector(nombre, maquina).toPromise();
    const respImg = await this.sectoresService.asignarImagen(resp._id, imagen).toPromise();
    this.dialogRef.close(respImg);
  }

  cerrarDialog(): void{
    this.dialogRef.close();
  }

}
