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
import { ItemNuevoComponent } from './items/item-nuevo/item-nuevo.component';
import { ItemEditarComponent } from './items/item-editar/item-editar.component';
import { ItemBorrarComponent } from './items/item-borrar/item-borrar.component';
import { CategoriaNuevoComponent } from './categorias/categoria-nuevo/categoria-nuevo.component';
import { CategoriaEditarComponent } from './categorias/categoria-editar/categoria-editar.component';
import { CategoriaBorrarComponent } from './categorias/categoria-borrar/categoria-borrar.component';
import { UsuarioNuevoComponent } from './usuarios/usuario-nuevo/usuario-nuevo.component';
import { UsuarioEditarComponent } from './usuarios/usuario-editar/usuario-editar.component';
import { UsuarioBorrarComponent } from './usuarios/usuario-borrar/usuario-borrar.component';



@NgModule({
  declarations: [
    MaquinaNuevoComponent,
    MaquinaEditarComponent,
    MaquinaBorrarComponent,
    SectorNuevoComponent,
    SectorEditarComponent,
    SectorBorrarComponent,
    ItemNuevoComponent,
    ItemEditarComponent,
    ItemBorrarComponent,
    CategoriaNuevoComponent,
    CategoriaEditarComponent,
    CategoriaBorrarComponent,
    UsuarioNuevoComponent,
    UsuarioEditarComponent,
    UsuarioBorrarComponent
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
