import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SectoresComponent } from './sectores/sectores.component';
import { ItemsComponent } from './items/items.component';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ControlComponent } from './control/control.component';

const routes: Routes = [
    {path: '', component: MainComponent, canActivate: [AuthGuard], children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'usuarios', component: UsuariosComponent},
        {path: 'maquinas', component: MaquinasComponent},
        {path: 'sectores', component: SectoresComponent},
        {path: 'items', component: ItemsComponent},
        {path: 'asignaciones', component: AsignacionesComponent},
        {path: 'categorias', component: CategoriasComponent},
        {path: 'reportes', component: ReportesComponent},
        {path: 'control/:id', component: ControlComponent},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PagesRoutingModule{ }
