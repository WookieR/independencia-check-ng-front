import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaquinaNuevoComponent } from './maquinas/maquina-nuevo/maquina-nuevo.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaquinaEditarComponent } from './maquinas/maquina-editar/maquina-editar.component';
import { MaquinaBorrarComponent } from './maquinas/maquina-borrar/maquina-borrar.component';
import { SectorNuevoComponent } from './sectores/sector-nuevo/sector-nuevo.component';
import { SectorEditarComponent } from './sectores/sector-editar/sector-editar.component';
import { SectorBorrarComponent } from './sectores/sector-borrar/sector-borrar.component';



@NgModule({
  declarations: [
    MaquinaNuevoComponent,
    MaquinaEditarComponent,
    MaquinaBorrarComponent,
    SectorNuevoComponent,
    SectorEditarComponent,
    SectorBorrarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [ 
    MaquinaNuevoComponent,
    MaquinaEditarComponent,
    MaquinaBorrarComponent,
    SectorNuevoComponent,
    SectorEditarComponent
  ]
})
export class ComponentsModule { }
