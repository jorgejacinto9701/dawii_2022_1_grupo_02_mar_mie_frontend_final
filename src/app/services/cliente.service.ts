import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Ubigeo } from '../models/ubigeo.model';
import { NumberSymbol } from '@angular/common';
import { Cliente } from '../models/cliente.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlCliente = AppSettings.API_ENDPOINT+ '/cliente';
const baseConsultarCliente="http://localhost:8090/url/cliente";


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  listaClienteAll(nombres:string, dni:string, idUbigeo:NumberSymbol, estado:number):Observable<any> {
    const params= new HttpParams().set("nombres",nombres).set("dni", dni).set("idUbigeo", idUbigeo).set("estado",estado);
    return  this.http.get<any>(baseConsultarCliente+"/listaClienteConParametros",{params});
     }

  
  constructor(private http: HttpClient) { }

  listaCliente():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(baseUrlUtil+"/listaCliente");
  }


  registraCliente(data:Cliente) : Observable<any>{
    return this.http.post(baseUrlCliente,data);


}
}