import { Component, OnInit } from '@angular/core';
import { SectoresService } from '../../services/sectores.service';
import { Sector } from '../../interfaces/sector.interface';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SectorNuevoComponent } from '../../components/sectores/sector-nuevo/sector-nuevo.component';
import { SectorEditarComponent } from '../../components/sectores/sector-editar/sector-editar.component';
import { SectorBorrarComponent } from '../../components/sectores/sector-borrar/sector-borrar.component';

@Component({
  selector: 'app-sectores',
  templateUrl: './sectores.component.html',
  styleUrls: ['./sectores.component.css']
})
export class SectoresComponent implements OnInit {

  public sectores: Sector[];

  public cargando: boolean;

  public breakpoint;

  constructor( private sectoresService: SectoresService, public authService: AuthService, public dialog: MatDialog ) {
    this.cargando = true;
  }

  ngOnInit(): void {
    this.cargando = true;

    this.breakpoint = (window.innerWidth <= 700) ? 1 : 3;

    this.obtenerSectores();
  }

  obtenerSectores(){
    this.cargando = true;
    this.sectoresService.getSectores().subscribe(resp => {
      this.cargando = false;
      this.sectores = resp;
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 1 : 3;
  }

  nuevoSector(){
    const dialogRef = this.dialog.open(SectorNuevoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (!resp){
        return;
      }

      this.sectores.push(resp);
    });
  }

  editarSector(sector: Sector){
    const dialogRef = this.dialog.open(SectorEditarComponent, {
      width: '400px',
      data: sector
    });

    dialogRef.afterClosed().subscribe((resp: Sector) => {
      // if (!resp){
      //   return;
      // }

      this.obtenerSectores();
      // const index = this.sectores.findIndex( sector => sector._id === resp._id);

      // this.sectores[index] = resp;

    });
  }

  borrarSector(sector: Sector){
    const dialogRef = this.dialog.open(SectorBorrarComponent, {
      width: '600px',
      data: sector
    });

    dialogRef.afterClosed().subscribe((resp: Sector) => {
      if (!resp){
        return;
      }

      const index = this.sectores.findIndex( sector => sector._id === resp._id);

      this.sectores.splice(index, 1);

    });

  }
}
