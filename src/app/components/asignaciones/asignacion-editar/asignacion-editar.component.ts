import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../../../services/items.service';
import { CategoriasService } from '../../../services/categorias.service';
import { AsignacionesService } from '../../../services/asignaciones.service';
import { Asignacion } from '../../../interfaces/asignacion.interface';
import { Categoria } from '../../../interfaces/categoria.interface';
import { Item } from '../../../interfaces/item.interface';

@Component({
  selector: 'app-asignacion-editar',
  templateUrl: './asignacion-editar.component.html',
  styleUrls: ['./asignacion-editar.component.css']
})
export class AsignacionEditarComponent implements OnInit {

  public asignacionForm: FormGroup;

  public items: Item[];
  public categorias: Categoria[];

  constructor(public dialogRef: MatDialogRef<AsignacionEditarComponent>,
              @Inject(MAT_DIALOG_DATA) public asignacion: Asignacion,
              private fb: FormBuilder,
              private itemsService: ItemsService,
              private categoriasService: CategoriasService,
              private asignacionesService: AsignacionesService) { }

  ngOnInit(): void {

    this.asignacionForm = this.fb.group({
      nombre: [this.asignacion.nombre, [Validators.required, Validators.minLength(3)], []],
      descripcion: [this.asignacion.descripcion, [Validators.required, Validators.minLength(3)], []],
      item: [this.asignacion.item._id, [Validators.required], []],
      categoria: [this.asignacion.categoria._id, [Validators.required], []]
    });

    this.categoriasService.getCategorias().subscribe( resp => {
      this.categorias = resp;
    });

    this.itemsService.getItems().subscribe( resp => {
      this.items = resp;
    });
  }

  actualizarAsignacion(){
    if(this.asignacionForm.invalid){
      return;
    }

    const nombre = this.asignacionForm.get('nombre').value;
    const descripcion = this.asignacionForm.get('descripcion').value;
    const item = this.asignacionForm.get('item').value;
    const categoria = this.asignacionForm.get('categoria').value;

    this.asignacionesService.editAsignacion(this.asignacion._id, nombre, descripcion, item, categoria).subscribe( resp => {
      this.dialogRef.close(resp);
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

}
