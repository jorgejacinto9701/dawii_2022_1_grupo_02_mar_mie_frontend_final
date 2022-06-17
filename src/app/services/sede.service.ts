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

}
