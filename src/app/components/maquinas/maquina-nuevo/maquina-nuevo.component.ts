import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaquinasService } from '../../../services/maquinas.service';

@Component({
  selector: 'app-maquina-nuevo',
  templateUrl: './maquina-nuevo.component.html',
  styleUrls: ['./maquina-nuevo.component.css']
})
export class MaquinaNuevoComponent implements OnInit {

  public maquinaForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<MaquinaNuevoComponent>, private fb: FormBuilder, private maquinasService: MaquinasService) { }

  ngOnInit(): void {
    this.maquinaForm = this.fb.group({
      nombre: ['Laguna', [Validators.required, Validators.minLength(3)], []],
      imagen: ['', [Validators.required]]
    });
  }

 async crearMaquina(): Promise<void>{
    if(this.maquinaForm.invalid){
      return;
    }
    const nombre: string = this.maquinaForm.get('nombre').value;
    const imagen: File = this.maquinaForm.get('imagen').value.files[0];

    const resp = await this.maquinasService.newMaquina(nombre).toPromise();
    const respImg = await this.maquinasService.asignarImagen(resp._id, imagen).toPromise();
    this.dialogRef.close(respImg);
  }

  cerrarDialog(): void{
    this.dialogRef.close();
  }
}
