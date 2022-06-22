import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-crud-sede',
  templateUrl: './crud-sede.component.html',
  styleUrls: ['./crud-sede.component.css']
})
export class CrudSedeComponent implements OnInit {

  sedes : Sede[] = [];
  filtro : string = "";

  paises : Pais[] = [];

  sede: Sede ={
    idSede:0,
    nombre:"",
    direccion:"",
    estado:1,
    codigoPostal:"",
    fechaCreacion: new Date ('dd-mm-aa'),
    pais:{
      idPais:-1,
    }
  };
  
   //para verificar que e pulsó el boton
   submitted = false;

  constructor(private sedeService: SedeService, private paisService: PaisService) {
    this.paisService.listaPais().subscribe(
      response => this.paises = response
    );
   }

cargaPais(){
  this.paisService.listaPais().subscribe(
    response =>  this.paises= response
   );

   this.sede!.pais!.idPais = -1;
 }


consulta(){
   this.sedeService.listaSedeCrud(this.filtro==""?"todos":this.filtro).subscribe(
        (x) => this.sedes = x
  );
}

actualizaEstado(aux : Sede){
  aux.estado = aux.estado == 0? 1 :0;
    this.sedeService.actualizaSedeCrud(aux).subscribe();
}

registra(){
   this.submitted = true;
   this.sedeService.registraSede(this.sede).subscribe(
    (x) => {
      document.getElementById("btn_reg_limpiar")?.click();
      document.getElementById("btn_reg_cerrar")?.click();
      alert(x.mensaje);
      this.sedeService.listaSedeCrud(this.filtro==""?"todos":this.filtro).subscribe(
            (x) => this.sedes = x
      );
    } 
);
     //limpiar los comobobox
     this.paises = [];

     //limpiar los componentes del formulario a través de los ngModel

     this.sede = { 
           idSede:0,
           nombre:"",
           direccion:"",
           estado:1,
           codigoPostal:"",
           fechaCreacion: new Date('dd-mm-aa'),
           pais:{
             idPais: -1
           }
     }
}

buscar(aux :Sede){
  this.sede  = aux;
  this.paisService.listaPais().subscribe(
      response =>  this.paises= response
  );
}

actualiza(){
  this.submitted = true;
  this.sedeService.actualizaSedeCrud(this.sede).subscribe(
    (x) => {
      document.getElementById("btn_act_limpiar")?.click();
      document.getElementById("btn_act_cerrar")?.click();
      alert(x.mensaje);
      this.sedeService.listaSedeCrud(this.filtro==""?"todos":this.filtro).subscribe(
              (x) => this.sedes = x
      );
    } 
);

  //limpiar los comobobox
    this.paises = [];

  //limpiar los componentes del formulario a través de los ngModel

    this.sede = { 
        idSede:0,
        nombre:"",
        direccion:"",
        estado:1,
        codigoPostal:"",
        pais:{
          idPais: -1
        }
    }
}

elimina(aux :Sede){
     this.sedeService.eliminaSedeCrud(aux.idSede).subscribe(
      (x) => {
        alert(x.mensaje);
        this.sedeService.listaSedeCrud(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.sedes = x
        );
      }
    );
}

ngOnInit(): void {}

}
