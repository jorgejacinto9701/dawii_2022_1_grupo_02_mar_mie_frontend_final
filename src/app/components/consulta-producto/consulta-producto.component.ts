import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-consulta-producto',
  templateUrl: './consulta-producto.component.html',
  styleUrls: ['./consulta-producto.component.css']
})
export class ConsultaProductoComponent implements OnInit {
nombre:string="";
serie:string="";
durabilidad:string="";
fecha:string = ""; 

estado:boolean = true;

  marca: Marca[]=[];
  pais: Pais[] = [];

  productos: Producto[]=[];
  producto:Producto ={
    marca: {   
       idMarca: -1,
       pais:{ 
          idPais:-1   }
   }
 
 }
 constructor(private MarcaService:MarcaService, private ProductoService:ProductoService,
  private PaisService:PaisService  ){
 this.MarcaService.listaMarca().subscribe( (x)=>this.marca=x  );
 this.PaisService.listaPais().subscribe( (x)=>this.pais=x  );
 }

 consultaProducto(){
  this.ProductoService.listaProductosAll(this.nombre, this.serie, this.durabilidad, this.estado?1:0).subscribe(
        (x) => {
            this.productos = x.lista;
            alert(x.mensaje);
        }
  );
}

 

  ngOnInit(): void {
  }

}
