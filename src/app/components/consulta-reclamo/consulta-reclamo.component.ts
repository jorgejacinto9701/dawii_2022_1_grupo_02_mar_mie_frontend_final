import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-consulta-reclamo',
  templateUrl: './consulta-reclamo.component.html',
  styleUrls: ['./consulta-reclamo.component.css']
})
export class ConsultaReclamoComponent implements OnInit {


  //Ng model
  descripcion:string = '';
  estado:Boolean=true;
  cliente:number = -1;
  tipo:number = -1;
  fecInicio:string = "";
  fecFin:string = "";

  reclamoLista: Reclamo[] = [];
  clienteLista: Cliente[] = [];
  tipoReclamo: TipoReclamo[] = [];

  constructor(private reclamoService: ReclamoService, private clienteService: ClienteService, private reclamoTipoService: TipoReclamoService) { }

  ngOnInit(): void {

    this.reclamoService.listaReclamo()
                       .subscribe({
                         next: (resp) => {
                           this.reclamoLista = [...resp]
                         },
                         error: (err) => console.error(err)

                       })

    this.clienteService.listaCliente()
                       .subscribe({
                        next: (resp) => {
                          this.clienteLista = [...resp]
                          console.log(this.clienteLista)
                        },
                        error: (err) => {
                          console.error(err)
                        }
                       })

    this.reclamoTipoService.listaTipoReclamo()
                       .subscribe({
                        next: (resp) => {
                          this.tipoReclamo = [...resp]
                          console.log(this.tipoReclamo)
                        },
                        error: (err) => {
                          console.error(err)
                        }
                       })

    }


  filtro():void{
    this.reclamoService.listaReclamoporParametros(this.descripcion,this.tipo,this.cliente,this.estado?1:0,this.fecInicio,this.fecFin)
                       .subscribe({
                         next: (resp) =>{
                           alert(resp.mensaje)
                           this.reclamoLista = [...resp.lista]
                         },
                         error: (err) =>{
                           console.error(err)
                         }
                       })
  }



}
