import { Component, EmbeddedViewRef, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario/usuario.service';
import Swal from 'sweetalert2';
import { LazyLoadEvent, ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ConfirmationService, MessageService]
})

export class ClienteComponent implements OnInit {

  usuarios: any = [];
  totalPaginas: number = 0;
  totalElements: number = 0;
  rows: any = 0;
  loading: boolean = false;
  last: boolean = false;
  first: boolean = false;
  selectedClientes: any = [];
  currentPage: number = 0;

  constructor(private servicioUser: UsuarioService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  nuevoCliente: any = {};

  ngOnInit(): void {
    this.servicioUser.obtenerClientePagina(this.currentPage, 4).subscribe(
      (res) => {
        console.log(res);
        this.totalPaginas = res.totalPaginas;
        this.totalElements = res.totalElements;
        this.rows = res.numberOfElements;
      }
    )
  }


  obtenerUsuarios() {
    this.servicioUser.buscarUsuarios().subscribe(
      (res) => this.mostrarUsuarios(res)
    );
  }

  obtenerPorPaginas(event: LazyLoadEvent) {
    this.servicioUser.obtenerClientePagina(this.currentPage, 4).subscribe(

      (res) => {

        if (event.first == 0) {
          console.log('Primera pagian -------------');
          this.currentPage = 0;
          this.rows = res.numberOfElements;
          this.usuarios = res.content;
          this.last = res.last;
          this.first = res.first;

        } else if (event.first == res.numberOfElements) {
          console.log('Ultima pagina');
          this.usuarios = res.content;
          this.currentPage = Number(event.first) / 4;
        }
        else {
          console.log("Trato norma " + this.currentPage);
          this.usuarios = res.content;
          this.last = res.last;
          this.rows = res.numberOfElements;
          this.first = res.first;
          // if(event.first != undefined && event.rows != undefined ){
          var temp = Number(event.first) / Number(event.rows);
          console.log('Paginator  actual: ' + temp);
          this.currentPage = temp;
          //}

        }


        console.log('Total  de elementos: ' + event.first);
        console.log('Fila por pagina : ' + event.rows);


      }
    )
  }


  mostrarUsuarios(usuario: any) {
    this.usuarios = usuario;
    console.log(this.usuarios);
  }


  registrarCliente() {

    let formularioCliente: any = document.getElementById('crearUsuario');
    if (formularioCliente.reportValidity()) {
      this.servicioUser.guardarUsuario(this.nuevoCliente)
        .subscribe(
          (res: any) => this.finalizarGuardar(res)
        );
    }

  }

  finalizarGuardar(res: any) {
    console.log(res);
    this.obtenerUsuarios();
    Swal.fire("Transaccion Exitosa!", "Un nuevo usuario se a registrado!", "success");
  }

  deleteUser(id:any) {
    this.confirmationService.confirm({
      message: '¿Esta seguro de eliminar este cliente?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioUser.eliminarUsuario(id);
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

  modificarCliente(u:any){
    this.nuevoCliente = u;
  }

}

