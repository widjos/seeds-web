import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  companiaRoot:string = environment.urlService+'compania/';
  constructor(private http:HttpClient) { }


  consumir(url:string):Observable<any>{
    return this.http.get(this.companiaRoot+url).pipe(
      catchError((e) => throwError("Hay un error"))
    );
  }

  consumirPost(url:string, parametro:any):Observable<any>{
    let htttOptions = {
      headers : new HttpHeaders(
        {'Content-Type': 'application/json'}
      )
    };

    return this.http.post<any>(this.companiaRoot+url, parametro, htttOptions).pipe(
      catchError((e) => throwError('Hay error'))
    );
  }

  eliminar(url:string):Observable<any>{
    return this.http.delete(this.companiaRoot+url).pipe(
      catchError((e) => throwError("Hay un error"))
    );
  }

  buscarCompania(){
    return this.consumir('buscar');
  }

  guardarCompania(compania:any){
    return this.consumirPost('guardar', compania);
  }

  eliminarCompania(idCompania:any){
    return this.eliminar(`eliminar/${idCompania}`);
  }
}
