import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Marca } from '../models/marca.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlMarca = AppSettings.API_ENDPOINT+ '/marca';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {

  constructor(private http:HttpClient) {  }

  listaMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlUtil + '/listaMarca');
  }

  registraMarca(data:Marca): Observable<any>{
    return this.http.post(baseUrlMarca, data);
  }

  consultaMarca(nombre:string, descripcion:string, estado:number, idPais:number):Observable<any> {

    const params = new HttpParams().set("nombre", nombre).set("descripcion", descripcion).set("estado", estado).set("idPais", idPais);
    
    return this.http.get(baseUrlMarca+"/porNombreDescripcionEstadoPaisConParametros", {params});
  }

  listarMarca(filtro:string):Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlMarca + "/listaMarcaPorNombreLike/"+ filtro);
  }  
  registrarMarca(obj: Marca): Observable<any>{
    return this.http.post(baseUrlMarca+ "/registraMarca", obj);
  }
  actualizarMarca(obj: Marca): Observable<any>{
    return this.http.put(baseUrlMarca + "/actualizaMarca", obj);
  }
  eliminarMarca(id : any): Observable<any>{
    return this.http.delete(baseUrlMarca + "/eliminaMarca/"+ id);
  }
}
