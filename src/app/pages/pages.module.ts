import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    MaquinasComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    MainComponent,
    DashboardComponent,
    MaquinasComponent
  ]
})
export class PagesModule { }
