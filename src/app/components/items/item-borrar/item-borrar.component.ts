import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../../interfaces/item.interface';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: 'app-item-borrar',
  templateUrl: './item-borrar.component.html',
  styleUrls: ['./item-borrar.component.css']
})
export class ItemBorrarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ItemBorrarComponent>,
              @Inject(MAT_DIALOG_DATA) public item: Item,
              private itemsService: ItemsService) { }

  ngOnInit(): void {
  }

  eliminarItem(){
    this.itemsService.deleteItem(this.item).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }

  cerrarDialog(): void{
    this.dialogRef.close();
  }

}
