import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-consulta-sede',
  templateUrl: './consulta-sede.component.html',
  styleUrls: ['./consulta-sede.component.css']
})
export class ConsultaSedeComponent implements OnInit {

  nombre: string="";
  direccion : string="";
  selPais: number= -1;
  estado: boolean=true;

  pais: Pais[] =[];

  sede: Sede[] =[];

  constructor(private paisService : PaisService, private sedeService: SedeService) { 
    paisService.listaPais().subscribe(
      (x) => this.pais = x
     );
  }

  consultaSede(){
    this.sedeService.listaSedeFiltro(this.nombre, this.direccion, this.selPais, this.estado?1:0).subscribe(
      (x) => {
        this.sede = x.lista;
        alert(x.mensaje);
      }
    );
  }

  cargaPais(){
    this.paisService.listaPais().subscribe(
      (x) => this.pais = x
    );
    this.selPais = -1;
  }
  
  ngOnInit(): void {
  }

}
