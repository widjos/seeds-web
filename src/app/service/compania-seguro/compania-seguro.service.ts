import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniaSeguroService {

  companiaSeguroRoot:string = environment.urlService+'companiaseguro/';
  constructor(private http:HttpClient) { }

  
  consumir(url:string):Observable<any>{
    return this.http.get(this.companiaSeguroRoot+url).pipe(
      catchError((e) => throwError("Hay un error"))
    );
  }

  consumirPost(url:string, parametro:any):Observable<any>{
    let htttOptions = {
      headers : new HttpHeaders(
        {'Content-Type': 'application/json'}
      )
    };

    return this.http.post<any>(this.companiaSeguroRoot+url, parametro, htttOptions).pipe(
      catchError((e) => throwError('Hay error'))
    );
  }

  eliminar(url:string):Observable<any>{
    return this.http.delete(this.companiaSeguroRoot+url).pipe(
      catchError((e) => throwError("Hay un error"))
    );
  }

  buscarCompSeguro(){
    return this.consumir('buscar');
  }

  buscarCompSeguroById(id:any){
    return this.consumir('buscar/'+id);
  }

  guardarCompaniaSeguro(companiaSeguro:any, name:any, idComp:any){
    return this.consumirPost(`guardar/compania/${name}/seguro/${idComp}`, companiaSeguro);
  }
  
  eliminarCompaniaSeguro(id:any, ){
    return this.eliminar('eliminar/'+id);
  }

}
