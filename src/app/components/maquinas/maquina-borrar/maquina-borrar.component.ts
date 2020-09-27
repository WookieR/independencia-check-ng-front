import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Maquina } from 'src/app/interfaces/maquina.interface';
import { MaquinasService } from '../../../services/maquinas.service';

@Component({
  selector: 'app-maquina-borrar',
  templateUrl: './maquina-borrar.component.html',
  styleUrls: ['./maquina-borrar.component.css']
})
export class MaquinaBorrarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MaquinaBorrarComponent>,
              @Inject(MAT_DIALOG_DATA) public maquina: Maquina,
              private maquinasService: MaquinasService) { }

  ngOnInit(): void {
  }

  cerrarDialog(): void{
    this.dialogRef.close();
  }

  eliminarMaquina(){
    this.maquinasService.deleteMaquina(this.maquina).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }

}
