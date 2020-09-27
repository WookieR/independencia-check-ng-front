import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Maquina } from 'src/app/interfaces/maquina.interface';
import { MaquinasService } from '../../../services/maquinas.service';

@Component({
  selector: 'app-maquina-editar',
  templateUrl: './maquina-editar.component.html',
  styleUrls: ['./maquina-editar.component.css']
})
export class MaquinaEditarComponent implements OnInit {

  public maquinaForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<MaquinaEditarComponent>,
               @Inject(MAT_DIALOG_DATA) public maquina: Maquina,
               private fb: FormBuilder,
               private maquinasService: MaquinasService ) { }

  ngOnInit(): void {
    this.maquinaForm = this.fb.group({
      nombre:[this.maquina.nombre, [Validators.required, Validators.minLength(3)], []],
      imagen:['', []]
    });
  }

  cerrarDialog(): void{
    this.dialogRef.close();
  }

  async actualizarMaquina(){
    if(this.maquinaForm.invalid){
      return;
    }

    if (!this.maquinaForm.get('imagen').value){
      // ACTUALIZAR SIN IMAGEN
      this.maquina.nombre = this.maquinaForm.get('nombre').value;
      this.maquinasService.editMaquina(this.maquina).subscribe(resp => this.dialogRef.close());
    } else {
      // ACTUALIZAR CON IMAGEN
      this.maquina.nombre = this.maquinaForm.get('nombre').value;
      const imagen: File = this.maquinaForm.get('imagen').value.files[0];

      const resp = await this.maquinasService.editMaquina(this.maquina).toPromise();
      const respImg = await this.maquinasService.asignarImagen( resp._id, imagen).toPromise();

      this.dialogRef.close(respImg);
    }
  }

}
