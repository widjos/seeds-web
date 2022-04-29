import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ClienteComponent } from './cliente/cliente.component';
import { SeguroComponent } from './seguro/seguro.component';
import { CompaniaComponent } from './compania/compania.component';
import { CompaniaSeguroComponent } from './compania-seguro/compania-seguro.component';
import { PeritoComponent } from './perito/perito.component';
import { SiniestroComponent } from './siniestro/siniestro.component';
import { ShowCompaniaSeguroComponent } from './show-compania-seguro/show-compania-seguro.component';

const routes: Routes = [
  { path: '' , component: BienvenidaComponent },
  { path: 'cliente' , component: ClienteComponent },
  { path: 'seguro' , component: SeguroComponent },
  { path: 'compania' , component: CompaniaComponent },
  { path: 'companiaseguro' , component: CompaniaSeguroComponent },
  { path: 'perito' , component: PeritoComponent },
  { path: 'siniestro' , component: SiniestroComponent },
  { path: 'showcompseg/:element' , component: ShowCompaniaSeguroComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
