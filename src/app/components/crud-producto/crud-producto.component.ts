import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {
//Para la grilla
productos:Producto[] = [];
filtro:string = "";
m : Marca[]= [];
p : Pais[] = [];
// Para la Marca y pais 
marcas:string[] = [];
paises:string[] = [];
//Json para registrarProducto o ActualizarProducto
producto:Producto ={
  idProducto: 0,
        nombre: "",
        serie: "",
        durabilidad: "",
        fechaVigencia: "2023-10-10",
        precio: undefined,
        stock: -1,
        estado: 1,
        marca:{
          idMarca:-1},
          pais:{
            idPais:-1}
};
  constructor(private productoService:ProductoService,  private marcaService:MarcaService, private paisService:PaisService) {
    this.marcaService.listaMarca1().subscribe((x)=>this.marcas=x);
    this.paisService.listaPais1().subscribe((x)=>this.paises=x);
   }
/*cargarMarca(){
  console.log("MArca >>> " + this.producto.marca?.idMarca);
  if(this.producto.marca?.idMarca==-1){
    this.marcas=[];  }
    this.producto.marca!.idMarca=-1;  
  }
  cargarPais(){
    console.log("Pais >>> " + this.producto.pais?.idPais);
  if(this.producto.pais?.idPais==-1){
    this.paises=[]; 
   }
    this.producto.pais!.idPais=-1; 
  }*/

  ngOnInit(): void {  }

  consulta(){
    this.productoService.listaProducto1(this.filtro==""?"todos":this.filtro).subscribe(
      (x)=>this.productos=x);
  }
actualizaEstado(aux:Producto){
  aux.estado=aux.estado==0?1:0;
  this.productoService.actualizaProducto(aux).subscribe();
}
buscar(aux:Producto){
  this.producto=aux;
  this.marcaService.listaMarca1().subscribe(
    response =>this.marcas=response
  );
  this.paisService.listaPais1().subscribe(
    response =>this.paises=response
  );
}
actualiza(){
  this.productoService.actualizaProducto(this.producto).subscribe(
    (x) => {
      document.getElementById("btn_act_limpiar")?.click();
      document.getElementById("btn_act_cerrar")?.click();
      alert(x.mensaje);
      this.productoService.listaProducto1(this.filtro==""?"todos" : this.filtro).subscribe(
        (x) => this.productos = x
  );
}
  );
  this.marcas=[];
  this.paises=[];
     //limpiar los componentes del formulario a través de los ngModel
  this.producto ={
    idProducto: 0,
          nombre: "",
          serie: "",
          durabilidad: "",
          fechaVigencia: "2023-10-10",
          precio: undefined,
          stock: -1,
          estado: 1,
          marca:{
            idMarca:-1,
          },
            pais:{
              idPais:-1,
            },
  }
}
registra(){
  this.productoService.registraProducto(this.producto).subscribe(
    (x)=>{
      document.getElementById("btn_reg_limpiar")?.click();
      document.getElementById("btn_reg_cerrar")?.click();
      alert(x.mensaje);
      this.productoService.listaProducto1(this.filtro==""?"todos":this.filtro).subscribe(
        (x)=> this.productos=x
      );
    }
  );
  this.marcas=[];
  this.paises=[];
    //limpiar los componentes del formulario a través de los ngModel
    this.producto ={
      idProducto: 0,
            nombre: "",
            serie: "",
            durabilidad: "",
            fechaVigencia: "2023-10-10",
            precio: undefined,
            stock: -1,
            estado: 1,
            marca:{
              idMarca:-1,
            },
              pais:{
                idPais:-1,
              },
    }
}
}
