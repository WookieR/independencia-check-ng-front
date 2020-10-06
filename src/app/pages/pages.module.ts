import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SectoresComponent } from './sectores/sectores.component';
import { ItemsComponent } from './items/items.component';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MaterialModule } from '../material.module';
import { PipesModule } from '../pipes/pipes.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportesComponent } from './reportes/reportes.component';
import { ControlComponent } from './control/control.component';


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    MaquinasComponent,
    SectoresComponent,
    ItemsComponent,
    AsignacionesComponent,
    CategoriasComponent,
    UsuariosComponent,
    ReportesComponent,
    ControlComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    PipesModule,
    MatDialogModule
  ],
  exports: [
    MainComponent,
    DashboardComponent,
    MaquinasComponent,
    SectoresComponent,
    ItemsComponent,
    AsignacionesComponent,
    CategoriasComponent,
    UsuariosComponent,
    ReportesComponent,
    ControlComponent
  ]
})
export class PagesModule { }
