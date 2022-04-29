import { Component, OnInit } from '@angular/core';
import { CompaniaService } from '../service/compania/compania.service';
import { LazyLoadEvent, ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';


@Component({
  selector: 'app-compania',
  templateUrl: './compania.component.html',
  styleUrls: ['./compania.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CompaniaComponent implements OnInit {

  companias:any =[];
  nuevaCompania:any = [];

  constructor(private servicioCompania: CompaniaService,private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerCompanias();
  }

  obtenerCompanias(){
    this.servicioCompania.buscarCompania().subscribe(
      (res) => this.mostrarCompanias(res)
    )
  }

  eliminarCompania(idCompania:any){
    this.confirmationService.confirm({
      message: '¿Esta seguro de eliminar esta compañia?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioCompania.eliminarCompania(idCompania).subscribe(
          (res) => this.obtenerCompanias()
        )
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Usted Elimino la compañia' });
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

  registrarCompania(){
    let formularioPerito:any = document.getElementById('crearCompania');
    if(formularioPerito.reportValidity()){
      
      this.servicioCompania.guardarCompania(this.nuevaCompania)
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
    this.obtenerCompanias();
    this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Su Compañia fue agregada' });

  }


  mostrarCompanias(compania:any){
    this.companias = compania;
    console.log(this.companias);
  }


  modificarCompania(c:any){
    this.nuevaCompania = c;
  }

}
