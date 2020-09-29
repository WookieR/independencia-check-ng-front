import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-categoria-nuevo',
  templateUrl: './categoria-nuevo.component.html',
  styleUrls: ['./categoria-nuevo.component.css']
})
export class CategoriaNuevoComponent implements OnInit {

  public categoriaForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<CategoriaNuevoComponent>,
               private fb: FormBuilder,
               private categoriasService: CategoriasService ) { }

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      descripcion: [ '', [Validators.required, Validators.minLength(3)], []]
    });
  }

  crearCategoria(){
    if(this.categoriaForm.invalid){
      return;
    }

    const descripcion = this.categoriaForm.get('descripcion').value;
    this.categoriasService.newCategoria(descripcion).subscribe( resp => {
      this.dialogRef.close(resp);
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

}
