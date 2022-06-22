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
  
constructor(private MarcaService:MarcaService, private ProductoService:ProductoService,
   private PaisService:PaisService  ){
  this.MarcaService.listaMarca().subscribe( (x)=>this.marca=x  );
  this.PaisService.listaPais().subscribe( (x)=>this.pais=x  );
  } 


insertaProducto(){
    this.ProductoService.registraProducto(this.producto).subscribe(
      (x) => alert(x.mensaje)    );
  }

  ngOnInit(): void {  }

}
