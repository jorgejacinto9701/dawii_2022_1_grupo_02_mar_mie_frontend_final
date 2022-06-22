import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-marca',
  templateUrl: './crud-marca.component.html',
  styleUrls: ['./crud-marca.component.css']
})
export class CrudMarcaComponent implements OnInit {

  marcas: Marca [] = [];
  filtro: string ="";

 
  paises : Pais[] = [];

  
  marca: Marca = { 
    idMarca:0,
    nombre:"",
    descripcion:"",
    certificado:"",
    estado:1,
    pais:{
      idPais: -1
    }
  };

  constructor(private marcaService:MarcaService, private paisService: PaisService) {
    this.paisService.listaPais().subscribe(
      (x) => this.paises = x
    );    
  }  

  ngOnInit(): void {
  }

  consulta(){
      this.marcaService.listarMarca(this.filtro==""?"todos":this.filtro).subscribe(
            (x) => this.marcas = x
      );
  }

  actualizaEstado(aux : Marca){
      aux.estado = aux.estado == 0? 1 :0;
      this.marcaService.actualizarMarca(aux).subscribe();
  }

  registra(){
      this.marcaService.registrarMarca(this.marca).subscribe(
            (x) => {
              document.getElementById("btn_reg_limpiar")?.click();
              document.getElementById("btn_reg_cerrar")?.click();
              alert(x.mensaje);
              this.marcaService.listarMarca(this.filtro==""?"todos":this.filtro).subscribe(
                      (x) => this.marcas = x
              );
            } 
      );

  
  this.marca = { 
      idMarca:0,
      nombre:"",
      descripcion:"",
      certificado:"",
      estado:1,
      pais:{
        idPais: -1,
      }
    }
  }

  buscar(aux :Marca){
      this.marca  = aux;
      this.paisService.listaPais().subscribe(
        response =>  this.paises= response
      );
  }

  actualiza(){
    this.marcaService.actualizarMarca(this.marca).subscribe(
          (x) => {
            document.getElementById("btn_act_cerrar")?.click();
            alert(x.mensaje);
            this.marcaService.listarMarca(this.filtro==""?"todos":this.filtro).subscribe(
                    (x) => this.marcas = x
            );
          } 
    );

   
    this.paises = [];

    
    this.marca = { 
      idMarca:0,
      nombre:"",
      descripcion:"",
      certificado:"",
      estado:1,
      pais:{
        idPais: -1,
      }
    }
  }

  elimina(aux:Marca){
    this.marcaService.eliminarMarca(aux.idMarca).subscribe(
      (x) => {
          alert(x.mensaje);
          this.marcaService.listarMarca(this.filtro==""?"todos":this.filtro).subscribe(
                  (x) => this.marcas = x
          );
      } 
    );
  }

}
