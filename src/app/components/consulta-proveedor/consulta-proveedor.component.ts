import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { ProveedorService } from 'src/app/services/proveedor.service';


@Component({
  selector: 'app-consulta-proveedor',
  templateUrl: './consulta-proveedor.component.html',
  styleUrls: ['./consulta-proveedor.component.css']
})
export class ConsultaProveedorComponent implements OnInit {

//Ng model
razonsocial:string="";
ruc:string="";
selDepartamento:string = "-1";
selProvincia:string = "-1";
selDistrito:number = -1;
estado:boolean = true;

//Ubigeo
departamentos: string[] = [];
provincias: string[] = [];
distritos: Ubigeo[] = [];

//Grilla
proveedor: Proveedor[] = [];


constructor(private ubigeoService: UbigeoService,private proveedorService:ProveedorService) {
ubigeoService.listarDepartamento().subscribe(
  (x) => this.departamentos = x
);
   }

   cargaProvincia(){  
      this.ubigeoService.listaProvincias(this.selDepartamento).subscribe(
        (x) => this.provincias = x
        );
        this.selProvincia = "-1";
        this.distritos = [];
        this.selDistrito = -1;
   }
cargaDistrito(){
  this.ubigeoService.listaDistritos(this.selDepartamento, this.selProvincia).subscribe(
    (x) => this.distritos = x
  );
  this.selDistrito = -1;
}

consultaProveedor(){
  this.proveedorService.listaProveedorAll(this.razonsocial, this.ruc, this.selDistrito, this.estado?1:0).subscribe(
    (x) => {
        this.proveedor = x.lista;
        alert(x.mensaje);
    }
);

}
  ngOnInit(): void {
  }

}
