import { Component, OnInit } from '@angular/core';
import { SeguroService } from '../service/seguro/seguro.service';
import { LazyLoadEvent, ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';


@Component({
  selector: 'app-seguro',
  templateUrl: './seguro.component.html',
  styleUrls: ['./seguro.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SeguroComponent implements OnInit {

  seguros:any = [];
  nuevoSeguro:any = {};


  constructor(private servicioSeguro:SeguroService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerSeguros();
  }

  
  obtenerSeguros(){
    this.servicioSeguro.buscarSeguro().subscribe(
      (res) => this.mostrarSeguro(res)
    );
  }

  eliminarSeguro(idSeguro:any){
    this.confirmationService.confirm({
      message: '¿Esta seguro de eliminar este seguro?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioSeguro.eliminarSeguro(idSeguro).subscribe(
          (res) => this.obtenerSeguros()
        )
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Usted Elimino el seguro' });
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

  mostrarSeguro(seguro:any){
    this.seguros = seguro;
    console.log(this.seguros);
  }

  

  registrarSeguro(){

    let formularioSeguro:any = document.getElementById('nuevoSeguroForm');
    if(formularioSeguro.reportValidity()){
      this.servicioSeguro.guardarSeguro(this.nuevoSeguro)
        .subscribe(
          (res:any) => this.finalizarGuardar(res)
        );
        formularioSeguro.reset();
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Debe llenar todos los campos.' });
    }

  }

  finalizarGuardar(res:any){
    console.log(res);
    this.obtenerSeguros();
    this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Su seguro fue agregado' });

  }

  modificarSeguro(seguro:any){
    this.nuevoSeguro = seguro;
  }


}
