import { Component, OnInit } from '@angular/core';
import { SiniestroService } from '../service/siniestro/siniestro.service';
import { LazyLoadEvent, ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-siniestro',
  templateUrl: './siniestro.component.html',
  styleUrls: ['./siniestro.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SiniestroComponent implements OnInit {

  siniestros:any = [];
  nuevoSiniestro:any = [];
  constructor(private servicioSiniestro: SiniestroService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerSiniestro();
  }

  obtenerSiniestro(){
    this.servicioSiniestro.buscarSiniestro().subscribe(
      (res) => this.mostrarSiniestros(res)
    )
  }

  elimininarSiniestro(idSiniestro:any){
    this.confirmationService.confirm({
      message: '¿Esta seguro de eliminar este Siniestro?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioSiniestro.eliminarSiniestro(idSiniestro).subscribe(
          (res) => this.obtenerSiniestro()
        )
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Usted Elimino el cliente' });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Declinado', detail: 'Olvidar' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Se cancelado la acción.' });
            break;
        }
      }
    });
  }

  registrarSiniestro(){
    let formularioPerito:any = document.getElementById('crearSiniestro');
    if(formularioPerito.reportValidity()){
      
      this.servicioSiniestro.guardarSiniestro(this.nuevoSiniestro)
        .subscribe(
          (res:any) => this.finalizarGuardar(res)
        );
        formularioPerito.reset();
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Debe llenar todos los campos.' });
    }
  }

  finalizarGuardar(res:any){
    console.log(res);
    this.obtenerSiniestro();
    this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Su perito fue agregado' });

  }

  mostrarSiniestros(siniestro:any){
    this.siniestros = siniestro;

  }

  modificarSiniestro(s:any){
    this.nuevoSiniestro = s;
    this.nuevoSiniestro.numeroPoliza = s['seguro'].numeroPoliza;
    this.nuevoSiniestro.dniPerito = s['perito'].dniPerito;
  }
}
