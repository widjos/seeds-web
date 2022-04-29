import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiniestroService {

  siniestroRoot:string = environment.urlService+'siniestro/';
  constructor(private http:HttpClient) { }

  consumir(url:string):Observable<any>{
    return this.http.get(this.siniestroRoot+url).pipe(
      catchError((e) => throwError("Hay un error"))
    );
  }

  consumirPost(url:string, parametro:any):Observable<any>{
    let htttOptions = {
      headers : new HttpHeaders(
        {'Content-Type': 'application/json'}
      )
    };

    return this.http.post<any>(this.siniestroRoot+url, parametro, htttOptions).pipe(
      catchError((e) => throwError('Hay error'))
    );
  }

  eliminar(url:string, idSiniestro:any):Observable<any>{
    let htttOptions = {
      params : new HttpParams().set('idSiniestro',idSiniestro) 
    };
    return this.http.delete(this.siniestroRoot+url,htttOptions).pipe(
      catchError((e) => throwError("Hay un error"))
    );
  }

  buscarSiniestro(){
    return this.consumir('buscar');
  }

  guardarSiniestro(siniestro:any){
    return this.consumirPost('guardar/seguro/perito', siniestro);
  }

  eliminarSiniestro(idSiniestro:any){
    return this.eliminar('eliminar',idSiniestro);
  }

}
