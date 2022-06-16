import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { ProveedorService } from 'src/app/services/proveedor.service';


@Component({
  selector: 'app-registra-proveedor',
  templateUrl: './registra-proveedor.component.html',
  styleUrls: ['./registra-proveedor.component.css']
})
export class RegistraProveedorComponent implements OnInit {


//Variables globales

departamentos: string[] = [];
provincias: string[] = [];
distritos: Ubigeo[] = [];

//variables seleccionadas

proveedor: Proveedor = { 
  ubigeo:{ 
idUbigeo:-1,
departamento:"-1",
provincia:"-1",
distrito:"-1",
}
}
  constructor(private UbigeoService:UbigeoService, private proveedorService:ProveedorService ) { 
this.UbigeoService.listarDepartamento().subscribe(
(x) => this.departamentos = x
);
}

cargaProvincia(){ 
  console.log(">>> Carga Provincia >> ");
console.log(">>> Departamento >>" + this.proveedor.ubigeo?.departamento);


  this.UbigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
    (x) => this.provincias = x
    );
    this.proveedor.ubigeo!.provincia="-1";
    this.distritos = [];
    this.proveedor.ubigeo!.idUbigeo=-1;
}
cargaDistrito(){ 
  console.log(">>> Carga Distrito >> ");
  console.log(">>> Departamento >>" + this.proveedor.ubigeo?.departamento);
  console.log(">>> Provincia >>" + this.proveedor.ubigeo?.provincia);
  

  this.UbigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
    (x) => this.distritos = x
    );

    this.proveedor.ubigeo!.idUbigeo= -1;
}

insertado(){
  this.proveedorService.registrarProveedor(this.proveedor).subscribe(
    (x) => alert(x.mensaje)
  );
}
  ngOnInit(): void {
  }

}
