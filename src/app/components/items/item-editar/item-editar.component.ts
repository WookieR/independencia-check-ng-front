import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../../interfaces/item.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../../../services/items.service';
import { SectoresService } from '../../../services/sectores.service';
import { Sector } from '../../../interfaces/sector.interface';

@Component({
  selector: 'app-item-editar',
  templateUrl: './item-editar.component.html',
  styleUrls: ['./item-editar.component.css']
})
export class ItemEditarComponent implements OnInit {

  public itemForm: FormGroup;

  public sectores: Sector[];

  constructor( public dialogRef: MatDialogRef<ItemEditarComponent>,
               @Inject(MAT_DIALOG_DATA) public item: Item,
               private fb: FormBuilder,
               private sectoresService: SectoresService,
               private itemsService: ItemsService ) { }

  ngOnInit(): void {

    this.itemForm = this.fb.group({
      nombre: [ this.item.nombre, [Validators.required, Validators.minLength(3)], []],
      sector: [ this.item.sector._id, [Validators.required], []]
    });

    this.sectoresService.getSectores().subscribe(resp => {
      this.sectores = resp;
    });

  }

  actualizarItem(){
    if (this.itemForm.invalid){
      return;
    }

    const nombre = this.itemForm.get('nombre').value;
    const sector = this.itemForm.get('sector').value;

    this.itemsService.editItem(this.item._id, nombre, sector).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }

  cerrarDialog(): void{
    this.dialogRef.close();
  }

}
