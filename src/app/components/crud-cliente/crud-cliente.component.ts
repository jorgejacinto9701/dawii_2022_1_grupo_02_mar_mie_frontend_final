import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';


@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})
export class CrudClienteComponent implements OnInit {


clientes: Cliente [] = [];
filtro: string ="";


departamentos: string[] = [];
provincias: string[] = [];
distritos: Ubigeo[] = [];



cliente: Cliente = { 
  idCliente:0,
  nombres:"",
  apellidos: "",
  correo: "",
  direccion: "",
  dni:"",
  estado:1,

  ubigeo:{
    idUbigeo: -1,
    departamento:"",
    provincia:"",
    distrito:"", 
  }
  };
  constructor(private clienteService:ClienteService, private ubigeoService:UbigeoService) {
    this.ubigeoService.listarDepartamento().subscribe(
      response => this.departamentos = response
    );
    }
    cargaProvincia(){  
      console.log("departamento >>> " + this.cliente.ubigeo?.departamento);
      
      if (this.cliente.ubigeo?.departamento == ""){
          this.provincias = [];
      }else{
      this.ubigeoService.listaProvincias(this.cliente.ubigeo?.departamento).subscribe(
       response => this.provincias= response
  );
  }

this.cliente!.ubigeo!.provincia = "";
this.distritos = [];
this.cliente!.ubigeo!.idUbigeo = -1;
}

cargaDistrito(){
  console.log("departamento >>> " + this.cliente.ubigeo?.departamento);
  console.log("provincia >>> " + this.cliente.ubigeo?.provincia);
 
  if (this.cliente.ubigeo?.departamento == "" || this.cliente.ubigeo?.provincia== "" ){
      this.distritos = [];
  }else{
  this.ubigeoService.listaDistritos(this.cliente.ubigeo?.departamento, this.cliente.ubigeo?.provincia).subscribe(
   response => this.distritos= response
);
}
this.cliente!.ubigeo!.idUbigeo = -1;
}

consulta (){
  this.clienteService.consultaCliente(this.filtro == ""?"todos": this.filtro).subscribe(
(x) => this.clientes = x

  );
}
actualizaEstado(aux : Cliente){
  aux.estado = aux.estado == 0? 1 :0;
  this.clienteService.actualizaCliente(aux).subscribe();
}

registra(){
  this.clienteService.registrarCliente(this.cliente).subscribe(
    (x) => {
      document.getElementById("btn_reg_limpiar")?.click();
      document.getElementById("btn_reg_cerrar")?.click();
      alert(x.mensaje);
      this.clienteService.consultaCliente(this.filtro==""?"todos":this.filtro).subscribe(
              (x) => this.clientes = x
      );
    } 
);

 
 this.distritos = [];
 this.provincias = [];
 
 this.cliente = { 
  idCliente:0,
  nombres:"",
  apellidos: "",
  correo: "",
  direccion: "",
  dni:"",
  estado:1,
  ubigeo:{
    idUbigeo: -1,
    departamento:"",
    provincia:"",
    distrito:"",
  }
}
}

buscar(aux : Cliente){
  this.cliente = aux;

  this.ubigeoService.listaProvincias(this.cliente.ubigeo?.departamento).subscribe(
    response => this.provincias= response
);

this.ubigeoService.listaDistritos(this.cliente.ubigeo?.departamento, this.cliente.ubigeo?.provincia).subscribe(
  response => this.distritos= response
);
}

actualiza(){
  this.clienteService.actualizaCliente(this.cliente).subscribe(
    (x) => {
      document.getElementById("btn_act_limpiar")?.click();
      document.getElementById("btn_act_cerrar")?.click();
      alert(x.mensaje);
      this.clienteService.consultaCliente(this.filtro==""?"todos":this.filtro).subscribe(
              (x) => this.clientes = x
      );
    } 
);


this.distritos = [];
this.provincias = [];



this.cliente = { 
  idCliente:0,
  nombres:"",
  apellidos: "",
  correo: "",
  direccion: "",
  dni:"",
  estado:1,
  ubigeo:{
    idUbigeo: -1,
    departamento:"",
    provincia:"",
    distrito:"",
  }
}
}
elimina(aux:Cliente){
  this.clienteService.eliminaCliente(aux.idCliente).subscribe(
    (x) => {
      alert(x.mensaje);
  this.clienteService.consultaCliente(this.filtro==""?"todos":this.filtro).subscribe(
    (x) => this.clientes = x
    );
  } 
);
} 
  ngOnInit(): void {
  }

}
