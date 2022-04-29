import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  seguroRoot:string = environment.urlService+'seguro/';

  constructor(private http:HttpClient) { }

  consumirGet(url:string):Observable<any>{
    return this.http.get(this.seguroRoot+url).pipe(
      catchError((e) => throwError("Hay un error"))
    );
  }



  consumirPost(url:string, parametro:any):Observable<any>{
    let htttOptions = {
      headers : new HttpHeaders(
        {'Content-Type': 'application/json'}
      )
    };

    return this.http.post<any>(this.seguroRoot+url, parametro, htttOptions).pipe(
      catchError((e) => throwError('Hay error'))
    );
  }

  eliminar(url:string):Observable<any>{
    return this.http.delete(this.seguroRoot+url).pipe(
      catchError((e) => throwError("Hay un error"))
    );
  }

  buscarSeguro(){
    return this.consumirGet("buscar");
  }

  guardarSeguro(usuario:any){
    return this.consumirPost('guardar', usuario);
  }

  eliminarSeguro(idSeguro:any){
    return this.eliminar(`eliminar/${idSeguro}`);
  }

}