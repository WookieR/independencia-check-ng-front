import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../../../services/items.service';
import { CategoriasService } from '../../../services/categorias.service';
import { AsignacionesService } from '../../../services/asignaciones.service';
import { Item } from '../../../interfaces/item.interface';
import { Categoria } from '../../../interfaces/categoria.interface';

@Component({
  selector: 'app-asignacion-nuevo',
  templateUrl: './asignacion-nuevo.component.html',
  styleUrls: ['./asignacion-nuevo.component.css']
})
export class AsignacionNuevoComponent implements OnInit {

  public asignacionForm: FormGroup;

  public items: Item[];
  public categorias: Categoria[];

  constructor(public dialogRef: MatDialogRef<AsignacionNuevoComponent>,
              private fb: FormBuilder,
              private itemsService: ItemsService,
              private categoriasService: CategoriasService,
              private asignacionesService: AsignacionesService ) { }

  ngOnInit(): void {
    this.asignacionForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)], []],
      descripcion: ['', [Validators.required, Validators.minLength(3)], []],
      item: ['', [Validators.required], []],
      categoria: ['', [Validators.required], []]
    });

    this.categoriasService.getCategorias().subscribe( resp => {
      this.categorias = resp;
    });

    this.itemsService.getItems().subscribe( resp => {
      this.items = resp;
    });
  }

  crearAsignacion(){
    if (this.asignacionForm.invalid){
      return;
    }

    const nombre = this.asignacionForm.get('nombre').value;
    const descripcion = this.asignacionForm.get('descripcion').value;
    const item = this.asignacionForm.get('item').value;
    const categoria = this.asignacionForm.get('categoria').value;

    this.asignacionesService.newAsignacion(nombre, descripcion, item, categoria).subscribe( resp => {
      this.dialogRef.close(resp);
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

}
