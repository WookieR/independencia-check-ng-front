import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../interfaces/item.interface';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemNuevoComponent } from '../../components/items/item-nuevo/item-nuevo.component';
import { ItemEditarComponent } from '../../components/items/item-editar/item-editar.component';
import { ItemBorrarComponent } from '../../components/items/item-borrar/item-borrar.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  public cargando: boolean;

  public items: Item[];

  constructor( private itemsService: ItemsService, public authService: AuthService, public dialog: MatDialog ) {
  }

  ngOnInit(): void {
    this.cargando = true;
    this.itemsService.getItems().subscribe(resp => {
      this.cargando = false;
      this.items = resp;
    });
  }

  nuevoItem(){
    const dialogRef = this.dialog.open(ItemNuevoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (!resp){
        return;
      }

      this.items.push(resp);
    });
  }

  editarItem(item: Item){
    const dialogRef = this.dialog.open(ItemEditarComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe((resp: Item) => {
      if (!resp){
        return;
      }

      // this.obtenerSectores();
      const index = this.items.findIndex( item => item._id === resp._id);

      this.items[index] = resp;

    });
  }

  borrarItem(item: Item){
    const dialogRef = this.dialog.open(ItemBorrarComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe((resp: Item) => {
      if (!resp){
        return;
      }

      const index = this.items.findIndex( item => item._id === resp._id);

      this.items.splice(index, 1);

    });
  }

}
