import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlSede = AppSettings.API_ENDPOINT+ '/sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http:HttpClient) {  }


listaSede():Observable<string[]>{
    return this.http.get<string[]>(baseUrlUtil+"/sede");
 }

 registrarSede(data:Sede) : Observable<any>{
  return this.http.post(baseUrlSede,data);
}

listaPais():Observable<string[]>{
  return this.http.get<string[]>(baseUrlUtil+"listaPais");
}

listaSedeFiltro(nombre:string, direccion:string, idPais:number, estado:number):Observable<any> {
  const params = new HttpParams().set("nombre", nombre).set("direccion", direccion).set("idPais", idPais).set("estado", estado);  
  return this.http.get<any>(baseUrlUtil + "/listaSedeConParametros", {params});
}

consultaSede(filtro:string):Observable<Sede[]>{
  return this.http.get<Sede[]>(baseUrlUtil + "/listaSedePorNombreLike/" +filtro );
 }

 registra(aux:Sede):Observable<any>{
  return this.http.post<any>(baseUrlUtil+"/registraSede",aux);
 }

 actualiza(aux:Sede):Observable<any>{
  return this.http.put<any>(baseUrlUtil+"/actualizaSede",aux);
 }

 elimina(id: any): Observable<any>{
  return this.http.delete(baseUrlUtil+"/eliminaSede/{id}",id);
}

 //CRUD
 consultaDocente(fil : any) : Observable<any>{
  return this.http.get("/porNombre/{filtro}"+fil);
 }
 registraSede(aux: Sede): Observable<any>{
  return this.http.post("/registraSede", aux);
 }
 actualizaSede(aux: Sede): Observable<any>{
  return this.http.put("/actualizaSede", aux);
 }
 eliminaSede(id: any): Observable<any>{
  return this.http.delete("/eliminaSede/{id}",id);
}

}
