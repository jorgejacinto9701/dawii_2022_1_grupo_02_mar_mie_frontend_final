import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {
//Para la grilla
productos:Producto[] = [];
filtro:string = "";

// Para la Marca y pais 
marcas:string[] = [];
paises:string[] = [];
m : Marca[]= [];
p : Pais[] = [];
//Json para registrarProducto o ActualizarProducto
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
   
  ngOnInit(): void {  }

  formsActualiza = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaSerie: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
    validaDurabilidad: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaPrecio: new FormControl('', [Validators.min(1)]),
    validaStock:new FormControl('',[Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(1)]),
    validaMarca:new FormControl('',[Validators.min(0)])
  });

    //para verificar que e pulsó el boton
    submitted = false;
    
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
  this.marcaService.listaMarca().subscribe(
    response =>this.m=response
  );
  this.paisService.listaPais().subscribe(
    response =>this.p=response
  );
}
actualiza(){
   this.productoService.actualizaProducto(this.producto).subscribe(
    (x) => {
      document.getElementById("btn_act_limpiar")?.click();
      document.getElementById("btn_act_cerrar")?.click();
      
      this.productoService.listaProducto1(this.filtro==""?"todos": this.filtro).subscribe(
        (x) => this.productos = x  );
        alert(x.mensaje);
}
  ); 
  this.m=[];
  this.p=[];
 
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
  }
  }
   
  registra(){
  this.productoService.registraProducto(this.producto).subscribe(
    (x)=>{      
     
    document.getElementById("btn_reg_limpiar")?.click();  
    document.getElementById("btn_reg_cerrar")?.click();
    //document.getElementById("id_reg_registra")?.click();
    
      this.productoService.listaProducto1(this.filtro==""?"todos":this.filtro).subscribe(
        (x)=> this.productos=x );
        alert(x.mensaje);
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
    }
}

elimina(aux: Producto){
  this.productoService.eliminaProducto(aux.idProducto).subscribe(   
    (x) => { 
      this.productoService.listaProducto1(this.filtro==""?"todos":this.filtro).subscribe(
     (x) => this.productos=x );
    alert(x.mensaje); 
     }
  )
}

}
