import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SectoresService } from '../../../services/sectores.service';
import { Sector } from '../../../interfaces/sector.interface';

@Component({
  selector: 'app-sector-borrar',
  templateUrl: './sector-borrar.component.html',
  styleUrls: ['./sector-borrar.component.css']
})
export class SectorBorrarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SectorBorrarComponent>,
              @Inject(MAT_DIALOG_DATA) public sector: Sector,
              private sectoresService: SectoresService) { }


  ngOnInit(): void {
  }

  cerrarDialog(): void{
    this.dialogRef.close();
  }

  eliminarMaquina(){
    console.log('Borranding...');
    this.sectoresService.deleteSector(this.sector).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }

}
