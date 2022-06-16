import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlProducto = AppSettings.API_ENDPOINT+ '/producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }
 
  listaMarca():Observable<string[]>{
    return this.http.get<string[]>(baseUrlUtil+"/listaMarca");
  }
listaPais():Observable<string[]>{
  return this.http.get<string[]>(baseUrlUtil+"/listaPais");
}

listaProducto():Observable<string[]>{
  return this.http.get<string[]>(baseUrlUtil+"/listaProducto");
}

registraProducto(data:Producto):Observable<any>{
return this.http.post(baseUrlProducto,data);
}
}

