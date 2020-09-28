import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Sector } from '../../../interfaces/sector.interface';
import { MaquinasService } from '../../../services/maquinas.service';
import { Maquina } from '../../../interfaces/maquina.interface';
import { SectoresService } from '../../../services/sectores.service';

@Component({
  selector: 'app-sector-editar',
  templateUrl: './sector-editar.component.html',
  styleUrls: ['./sector-editar.component.css']
})
export class SectorEditarComponent implements OnInit {

  public sectorForm: FormGroup;

  public maquinas: Maquina[];

  constructor( public dialogRef: MatDialogRef<SectorEditarComponent>,
               @Inject(MAT_DIALOG_DATA) public sector: Sector,
               private fb: FormBuilder,
               private maquinasService: MaquinasService,
               private sectoresService: SectoresService ) { }

  ngOnInit(): void {

    console.log(this.sector);

    this.maquinasService.getMaquinas().subscribe(resp => {
      this.maquinas = resp;
    });

    this.sectorForm = this.fb.group({
      nombre: [ this.sector.nombre, [Validators.required, Validators.minLength(3)], []],
      maquina: [ this.sector.maquina._id || this.sector.maquina, [Validators.required], []],
      imagen: [ '', [], []]
    });

  }

  cerrarDialog(): void{
    this.dialogRef.close();
  }

  async actualizarSector(){
    console.log(this.sectorForm.value);
    if(this.sectorForm.invalid){
      return;
    }

    if (!this.sectorForm.get('imagen').value){
      // ACTUALIZAR SIN IMAGEN
      const nombre = this.sectorForm.get('nombre').value;
      const maquina = this.sectorForm.get('maquina').value;

      this.sectoresService.editSector(this.sector._id, nombre, maquina).subscribe(resp => this.dialogRef.close());
    } else {
      // ACTUALIZAR CON IMAGEN
      const nombre = this.sectorForm.get('nombre').value;
      const maquina = this.sectorForm.get('maquina').value;
      const imagen: File = this.sectorForm.get('imagen').value.files[0];

      const resp = await this.sectoresService.editSector(this.sector._id, nombre, maquina).toPromise();
      const respImg = await this.sectoresService.asignarImagen( resp._id, imagen).toPromise();

      this.dialogRef.close(respImg);
    }
  }


}
