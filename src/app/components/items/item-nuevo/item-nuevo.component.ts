import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../../../services/items.service';
import { SectoresService } from '../../../services/sectores.service';
import { Sector } from '../../../interfaces/sector.interface';

@Component({
  selector: 'app-item-nuevo',
  templateUrl: './item-nuevo.component.html',
  styleUrls: ['./item-nuevo.component.css']
})
export class ItemNuevoComponent implements OnInit {

  public sectores: Sector[];

  public itemForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<ItemNuevoComponent>,
               private fb: FormBuilder,
               private itemsService: ItemsService,
               private sectoresService: SectoresService) { }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)], []],
      sector: ['', [Validators.required], []]
    });

    this.sectoresService.getSectores().subscribe(resp => {
      this.sectores = resp;
    });
  }

  cerrarDialog(): void{
    this.dialogRef.close();
  }

  crearItem(){
    if (this.itemForm.invalid){
      return;
    }
    const nombre = this.itemForm.get('nombre').value;
    const sector = this.itemForm.get('sector').value;

    this.itemsService.newItem(nombre, sector).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }
}
