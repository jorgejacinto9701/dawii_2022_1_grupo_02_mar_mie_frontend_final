import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';
import { AppSettings } from '../app.settings';


const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlProveedor = AppSettings.API_ENDPOINT+ '/proveedor';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

 listaProveedor():Observable<Proveedor[]>{
return this.http.get<Proveedor[]>(baseUrlUtil+"/listaProveedor");


}
registrarProveedor(data:Proveedor) : Observable<any>{
  return this.http.post(baseUrlProveedor,data);

}
listaProveedorAll(razonsocial:string, ruc:string, idUbigeo:number, estado:number):Observable<any> {
  const params= new HttpParams().set("razonsocial",razonsocial).set("ruc", ruc).set("idUbigeo", idUbigeo).set("estado",estado);
  return  this.http.get<any>(baseUrlProveedor+"/listaProveedorConParametros",{params});
   }

}
