import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from './cliente/cliente.component';
import { SeguroComponent } from './seguro/seguro.component';
import {TableModule} from 'primeng/table';
import {CarouselModule} from 'primeng/carousel';
import {CardModule} from 'primeng/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AccordionModule} from 'primeng/accordion';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import { CompaniaComponent } from './compania/compania.component';
import { SiniestroComponent } from './siniestro/siniestro.component';
import { PeritoComponent } from './perito/perito.component';
import { CompaniaSeguroComponent } from './compania-seguro/compania-seguro.component';
import { ShowCompaniaSeguroComponent } from './show-compania-seguro/show-compania-seguro.component'




@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    ClienteComponent,
    SeguroComponent,
    CompaniaComponent,
    SiniestroComponent,
    PeritoComponent,
    CompaniaSeguroComponent,
    ShowCompaniaSeguroComponent
  ],
  imports: [
    InputTextModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    CarouselModule,
    CardModule,
    FontAwesomeModule,
    AccordionModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
