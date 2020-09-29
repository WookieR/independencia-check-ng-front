import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.css']
})
export class CategoriaEditarComponent implements OnInit {

  public categoriaForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<CategoriaEditarComponent>,
               @Inject(MAT_DIALOG_DATA) public categoria: Categoria,
               private fb: FormBuilder,
               private categoriasService: CategoriasService ) { }

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      descripcion: [ this.categoria.descripcion, [ Validators.required, Validators.minLength(3) ], [] ]
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

  actualizarCategoria(){
    if (this.categoriaForm.invalid){
      return;
    }

    const descripcion = this.categoriaForm.get('descripcion').value;

    this.categoriasService.editCategoria(this.categoria._id, descripcion).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }

}
