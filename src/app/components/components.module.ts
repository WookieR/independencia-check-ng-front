import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaquinaNuevoComponent } from './maquinas/maquina-nuevo/maquina-nuevo.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaquinaEditarComponent } from './maquinas/maquina-editar/maquina-editar.component';
import { MaquinaBorrarComponent } from './maquinas/maquina-borrar/maquina-borrar.component';



@NgModule({
  declarations: [
    MaquinaNuevoComponent,
    MaquinaEditarComponent,
    MaquinaBorrarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [ 
    MaquinaNuevoComponent,
    MaquinaEditarComponent,
    MaquinaBorrarComponent
  ]
})
export class ComponentsModule { }
