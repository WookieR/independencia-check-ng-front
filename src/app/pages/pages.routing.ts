import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {path: '', component: MainComponent, canActivate: [AuthGuard], children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'maquinas', component: MaquinasComponent},
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
