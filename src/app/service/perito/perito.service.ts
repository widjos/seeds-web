import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeritoService {

  peritoRoot:string = environment.urlService+'perito/';
  constructor(private http:HttpClient) { }

  consumir(url:string):Observable<any>{
    return this.http.get(this.peritoRoot+url).pipe(
      catchError((e) => throwError("Hay un error"))
    );
  }

  consumirPost(url:string, parametro:any):Observable<any>{
    let htttOptions = {
      headers : new HttpHeaders(
        {'Content-Type': 'application/json'}
      )
    };

    return this.http.post<any>(this.peritoRoot+url, parametro, htttOptions).pipe(
      catchError((e) => throwError('Hay error'))
    );
  }
  

  eliminar(url:string):Observable<any>{
    return this.http.delete(this.peritoRoot+url).pipe(
      catchError((e) => throwError("Hay un error"))
    );
  }

  buscarPerito(){
    return this.consumir('buscar');
  }

  guardarPerito(perito:any){
    return this.consumirPost('guardar',  perito);
  }

  eliminarPerito(idPerito:any){
    return this.eliminar('eliminar/'+idPerito);
  }

}
