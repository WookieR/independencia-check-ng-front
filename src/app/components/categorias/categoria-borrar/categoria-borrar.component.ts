import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from '../../../interfaces/categoria.interface';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-categoria-borrar',
  templateUrl: './categoria-borrar.component.html',
  styleUrls: ['./categoria-borrar.component.css']
})
export class CategoriaBorrarComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<CategoriaBorrarComponent>,
               @Inject(MAT_DIALOG_DATA) public categoria: Categoria,
               private categoriasService: CategoriasService ) { }

  ngOnInit(): void {
  }

  eliminarCategoria(){
    this.categoriasService.deleteCategoria(this.categoria).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

}
