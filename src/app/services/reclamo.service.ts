import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';

const baseUrlReclamo = 'http://localhost:8090/url/reclamo';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  constructor(private http:HttpClient) { }

  listaReclamo():Observable<any> {
    return this.http.get<Reclamo[]>(baseUrlReclamo+'/estado/1')
  }

  listaReclamoporParametros(descripcion:string, idTipoReclamo: number, idCliente:number, estado: number,fechaInicio:string,fechaFin:string):Observable<any> {
    const params = new HttpParams().set("descripcion", descripcion).set("idTipoReclamo", idTipoReclamo).set("idCliente", idCliente).set("estado", estado).set("fechaInicio", fechaInicio).set("fechaFin", fechaFin);
    return this.http.get<any>(baseUrlReclamo + "/listaReclamoConParametros", {params});
 }

 registraReclamo(obj: Reclamo): Observable<any>{
  return this.http.post(baseUrlReclamo + "/registraReclamo", obj )
 }


 actualizaReclamo(obj: Reclamo): Observable<any>{
  return this.http.put(baseUrlReclamo + "/actualizaReclamo", obj);
}

eliminaDocente(id: any): Observable<any>{
  return this.http.delete(baseUrlReclamo + "/eliminaReclamo/" + id);
}


listaReclamoDescripcion(filtro:string):Observable<Reclamo[]> {
  return this.http.get<Reclamo[]>(baseUrlReclamo + "/porDescripcion/"+ filtro);
}

}
