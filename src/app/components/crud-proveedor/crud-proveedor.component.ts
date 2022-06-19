import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';


@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {

//Grilla
proveedors: Proveedor [] = [];
filtro: string ="";

//para bugieo
departamentos: string[] = [];
provincias: string[] = [];
distritos: Ubigeo[] = [];

//json para registrar y actualizar

proveedor: Proveedor = { 
idProveedor:0,
razonsocial:"",
ruc:"",
estado:1,
ubigeo:{
  idUbigeo: -1,
  departamento:"",
  provincia:"",
  distrito:"", 
}
};

constructor(private proveedorService:ProveedorService, private ubigeoService:UbigeoService) {
  this.ubigeoService.listarDepartamento().subscribe(
    response => this.departamentos = response
  );
  }

  cargaProvincia(){  
    console.log("departamento >>> " + this.proveedor.ubigeo?.departamento);
    
    if (this.proveedor.ubigeo?.departamento == ""){
        this.provincias = [];
    }else{
    this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
     response => this.provincias= response
);
}

this.proveedor!.ubigeo!.provincia = "";
this.distritos = [];
this.proveedor!.ubigeo!.idUbigeo = -1;

 }

 cargaDistrito(){
  console.log("departamento >>> " + this.proveedor.ubigeo?.departamento);
  console.log("provincia >>> " + this.proveedor.ubigeo?.provincia);
 
  if (this.proveedor.ubigeo?.departamento == "" || this.proveedor.ubigeo?.provincia== "" ){
      this.distritos = [];
  }else{
  this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
   response => this.distritos= response
);
}
this.proveedor!.ubigeo!.idUbigeo = -1;
}
consulta (){
  this.proveedorService.consultaProveedor(this.filtro == ""?"todos": this.filtro).subscribe(
(x) => this.proveedors = x

  );
}

actualizaEstado(aux : Proveedor){
  aux.estado = aux.estado == 0? 1 :0;
  this.proveedorService.actualizaProveedor(aux).subscribe();
}

registra(){
  this.proveedorService.registrarProveedor(this.proveedor).subscribe(
    (x) => {
      document.getElementById("btn_reg_limpiar")?.click();
      document.getElementById("btn_reg_cerrar")?.click();
      alert(x.mensaje);
      this.proveedorService.consultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
              (x) => this.proveedors = x
      );
    } 
);

 //limpiar los comobobox
 this.distritos = [];
 this.provincias = [];
 //limpiar los componentes del formulario a través de los ngModel
 this.proveedor = { 
  idProveedor:0,
  razonsocial:"",
  ruc:"",
  estado:1,
  ubigeo:{
    idUbigeo: -1,
    departamento:"",
    provincia:"",
    distrito:"",
  }
}
}

buscar(aux : Proveedor){
  this.proveedor = aux;

  this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
    response => this.provincias= response
);

  this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
    response => this.distritos= response
 );
}

actualiza(){
  this.proveedorService.actualizaProveedor(this.proveedor).subscribe(
    (x) => {
      document.getElementById("btn_act_limpiar")?.click();
      document.getElementById("btn_act_cerrar")?.click();
      alert(x.mensaje);
      this.proveedorService.consultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
              (x) => this.proveedors = x
      );
    } 
);

//limpiar los comobobox
this.distritos = [];
this.provincias = [];

//limpiar los componentes del formulario a través de los ngModel

this.proveedor = { 
  idProveedor:0,
  razonsocial:"",
  ruc:"",
  estado:1,
  ubigeo:{
    idUbigeo: -1,
    departamento:"",
    provincia:"",
    distrito:"",
  }
}
}
elimina(aux:Proveedor){
  this.proveedorService.eliminaProveedor(aux.idProveedor).subscribe(
    (x) => {
      alert(x.mensaje);
  this.proveedorService.consultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
    (x) => this.proveedors = x
    );
  } 
);
} 
  ngOnInit(): void {
  }

}
