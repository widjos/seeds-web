import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userRoot:string = environment.urlService+'cliente/';
  constructor(private http:HttpClient) { }

  consumir(url:string):Observable<any>{
    return this.http.get(this.userRoot+url).pipe(
      catchError((e) => throwError("Hay un error"))
    );
  }

  consumirPost(url:string, parametro:any):Observable<any>{
    let htttOptions = {
      headers : new HttpHeaders(
        {'Content-Type': 'application/json'}
      )
    };

    return this.http.post<any>(this.userRoot+url, parametro, htttOptions).pipe(
      catchError((e) => throwError('Hay error'))
    );
  }

  deleteUser(url:string): Observable<any>{
    return this.http.delete<any>(this.userRoot+url).pipe(catchError((e) =>
    throwError("Existe un error al eliminar")));
  }

  buscarUsuarios(){
    return this.consumir("buscar");
  }


  obtenerClientePagina(pagina:any, cantidad:any){
    return this.consumir('buscar/paginacion/'+pagina+'/'+cantidad);
  }

  guardarUsuario(usuario:any){
    return this.consumirPost('guardar', usuario);
  }

  eliminarUsuario(id:any){
    return this.deleteUser('eliminar/'+id).subscribe((res:any) => this.actualizarClientes());
  }

  actualizarClientes(){
    return this.consumir("buscar");
  }

}
