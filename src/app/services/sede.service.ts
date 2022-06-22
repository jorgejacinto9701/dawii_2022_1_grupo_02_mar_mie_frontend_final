import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';
import { environment } from 'src/environments/environment';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlSede = AppSettings.API_ENDPOINT+ '/sede';
const baseUrlCrudSede = AppSettings.API_ENDPOINT+ '/crudSede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  //private apiServerURL = environment.apiBaseURL;

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

listaSedeFiltro(nombre:string, direccion:string, codigoPostal:string,  idPais:number, estado:number):Observable<any> {
  const params = new HttpParams().set("nombre", nombre).set("direccion", direccion).set("codigoPostal",codigoPostal).set("idPais", idPais).set("estado", estado);  
  return this.http.get<any>(baseUrlUtil + "/listaSedeConParametros", {params});
}

consulta(filtro:string):Observable<Sede[]>{
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
 consultaSede(fil : any) : Observable<any>{
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

listaSedeCrud(filtro:string):Observable<Sede[]> {
  return this.http.get<Sede[]>(baseUrlCrudSede + "/porNombre/"+ filtro);
}  

registraSedeCrud(obj: Sede): Observable<any>{
  return this.http.post(baseUrlCrudSede + "/registraSede", obj);
}

actualizaSedeCrud(obj: Sede): Observable<any>{
return this.http.put(baseUrlCrudSede + "/actualizaSede", obj);
}

eliminaSedeCrud(id: any): Observable<any>{
return this.http.delete(baseUrlCrudSede + "/eliminaSede/"+ id);
}

}
