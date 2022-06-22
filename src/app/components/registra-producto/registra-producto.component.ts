import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-registra-producto',
  templateUrl: './registra-producto.component.html',
  styleUrls: ['./registra-producto.component.css']
})
export class RegistraProductoComponent implements OnInit {
   marca: Marca[]=[];
   pais: Pais[] = [];
   m : Marca[]= [];
   p : Pais[] = [];
 
   producto:Producto ={
    idProducto: 0,
          nombre: "",
          serie: "",
          durabilidad: "",
          fechaVigencia: "",
          precio: undefined,
          stock: 0,
          estado: 1,
          marca:{
            idMarca:-1},
            pais:{
              idPais:-1}
  };
  
  constructor(private productoService:ProductoService,  private marcaService:MarcaService, private paisService:PaisService) {
    this.marcaService.listaMarca().subscribe((x)=>this.m=x);
    this.paisService.listaPais().subscribe((x)=>this.p=x);
   }

  registra(){  this.productoService.registraProducto(this.producto).subscribe(
      (x)=>{  
             
       //document.getElementById("id_reg_registra")?.click();
      //document.getElementById("btn_reg_registrar")?.click();  
      document.getElementById("btn_act_limpiar")?.click();
     alert(x.mensaje);     
      
            }
    );
    this.marca=[];
    this.pais=[];
      //limpiar los componentes del formulario a través de los ngModel
      this.producto ={
        idProducto: 0,
              nombre: "",
              serie: "",
              durabilidad: "",
              fechaVigencia: "",
              precio: undefined,
              stock: 0,
              estado: 1,
              marca:{
                idMarca:-1,
              },
                pais:{
                  idPais:-1,
                },
      }   }

  ngOnInit(): void {  }

}
