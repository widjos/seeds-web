import { Component, OnInit } from '@angular/core';
import { CompaniaSeguroService } from '../service/compania-seguro/compania-seguro.service';
import { LazyLoadEvent, ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-compania-seguro',
  templateUrl: './compania-seguro.component.html',
  styleUrls: ['./compania-seguro.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CompaniaSeguroComponent implements OnInit {

  companiaSeguros:any = [];
  nuevaCompaniaSeguro:any =[];
  constructor(private servicioCompSeguro: CompaniaSeguroService,private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerCompSeg();
  }

  obtenerCompSeg(){
    this.servicioCompSeguro.buscarCompSeguro().subscribe(
      (res) => this.mostrarCompSeguro(res)
    )
  }


  eliminarCompSeguro(id:any){
    this.confirmationService.confirm({
      message: '¿Esta seguro de eliminar este seguro de la compañia?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioCompSeguro.eliminarCompaniaSeguro(id).subscribe(
          (res) => this.obtenerCompSeg()
        )
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Usted Elimino el el seguro a la compañia' });
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

  registrarCompSeguro(id:any,name:any,poliza:any){
    let formularioPerito:any = document.getElementById('crearCompSeguro');
    if(formularioPerito.reportValidity()){
      
      this.servicioCompSeguro.guardarCompaniaSeguro(id,name,poliza)
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
    this.obtenerCompSeg();
    this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Se agrego un seguro a la compañia' });

  }

  mostrarCompSeguro(compSeguro:any){
    this.companiaSeguros = compSeguro;
  }

  modificarCompSeguro(cs:any){
    this.nuevaCompaniaSeguro = cs;
    this.nuevaCompaniaSeguro.nombreCompania = cs.compania.nombreCompania;
    this.nuevaCompaniaSeguro.numeroPoliza =  cs.seguro.numeroPoliza;
  }
  
  mostrarInfo(element:any){
    location.href = 'showcompseg/'+element;
  }

}
