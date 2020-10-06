import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interfaces/categoria.interface';
import { CategoriasService } from '../../services/categorias.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaNuevoComponent } from 'src/app/components/categorias/categoria-nuevo/categoria-nuevo.component';
import { CategoriaEditarComponent } from '../../components/categorias/categoria-editar/categoria-editar.component';
import { CategoriaBorrarComponent } from '../../components/categorias/categoria-borrar/categoria-borrar.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public cargando: boolean;

  public categorias: Categoria[];

  constructor( private categoriasService: CategoriasService, public authService: AuthService, public dialog: MatDialog ) {
    this.cargando = true;
  }

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe(resp => {
      this.cargando = false;
      this.categorias = resp;
    });
  }

  nuevaCategoria() {
    const dialogRef = this.dialog.open(CategoriaNuevoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (!resp){
        return;
      }

      this.categorias.push(resp);
    });

  }

  editarCategoria(categoria: Categoria) {
    const dialogRef = this.dialog.open(CategoriaEditarComponent, {
      width: '400px',
      data: categoria
    });

    dialogRef.afterClosed().subscribe((resp: Categoria) => {
      if (!resp){
        return;
      }

      // this.obtenerSectores();
      const index = this.categorias.findIndex( item => item._id === resp._id);

      this.categorias[index] = resp;

    });
  }

  borrarCategoria(categoria: Categoria){
    const dialogRef = this.dialog.open(CategoriaBorrarComponent, {
      width: '400px',
      data: categoria
    });

    dialogRef.afterClosed().subscribe((resp: Categoria) => {
      if (!resp){
        return;
      }

      const index = this.categorias.findIndex( item => item._id === resp._id);

      this.categorias.splice(index, 1);

    });
  }

}
