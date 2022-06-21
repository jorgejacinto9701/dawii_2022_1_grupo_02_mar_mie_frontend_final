import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-reclamo',
  templateUrl: './crud-reclamo.component.html',
  styleUrls: ['./crud-reclamo.component.css']
})
export class CrudReclamoComponent implements OnInit {


  clientesLista: Cliente[] = [];
  tipoReclamo: TipoReclamo[] = [];
  reclamosLista: Reclamo [] = [];
  filtro: string = '';

  reclamo: Reclamo = {
    idReclamo: 0,
    descripcion: "",
    estado:1,
    cliente: {
      idCliente: -1,
      nombres: '',
    },
    tipoReclamo:{
      idTipoReclamo:-1,
      descripcion: "",
    }

  }

  formsValidacion = new FormGroup({
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]{10,40}')]),
    validaFecha: new FormControl('',[Validators.required]),
    validaCliente: new FormControl('', [ Validators.min(1)]),
    validaTipoReclamo: new FormControl('', [ Validators.min(1)]),
    validaEstado: new FormControl('',[Validators.min(0)]),
  });

  submitted = false;

  constructor( private reclamoService: ReclamoService, private clienteService: ClienteService, private reclamoTipoService: TipoReclamoService) {}

    ngOnInit(): void {
      this.reclamoService.listaReclamo()
      .subscribe({
        next: (resp) => {
          this.reclamosLista = [...resp]
        },
        error: (err) => console.error(err)

      })

    this.clienteService.listaCliente()
        .subscribe({
        next: (resp) => {
          this.clientesLista = [...resp]
          console.log(this.clientesLista)
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

  actualizaEstado(aux : Cliente){
    aux.estado = aux.estado == 0? 1 :0;
    this.reclamoService.actualizaReclamo(aux).subscribe();
  }

  registrar(){
    this.submitted = true;

    if( this.formsValidacion.invalid){
      return;
    }

    this.submitted = false;

    this.reclamoService.registraReclamo(this.reclamo)
                       .subscribe({
                        next: (resp) => {
                          document.getElementById("btn_reg_cerrar")?.click();
                          Swal.fire('Mensaje', resp.mensaje,'success');
                          this.ngOnInit();
                          }
                        })
    this.reclamo = {
      idReclamo: 0,
      descripcion: "",
      estado:1,
      cliente: {
        idCliente: -1,
        nombres: '',
      },
      tipoReclamo:{
        idTipoReclamo:-1,
        descripcion: "",
      }
    }
  }

  actualiza(){
    this.submitted = true;
    console.log(this.reclamo.descripcion)
    if (this.formsValidacion.invalid){
      return;
    }

    this.submitted = false;

    this.reclamoService.actualizaReclamo(this.reclamo)
                       .subscribe({
                        next: (resp) =>{
                          document.getElementById("btn_act_cerrar")?.click();
                           Swal.fire('Mensaje', resp.mensaje,'success');
                           this.ngOnInit();
                        }
                       })

    this.reclamo = {
      idReclamo: 0,
      descripcion: "",
      estado:1,
      cliente: {
        idCliente: -1,
        nombres: '',
      },
      tipoReclamo:{
        idTipoReclamo:-1,
        descripcion: "",
      }}

  }

  buscar(aux :Reclamo){
    this.reclamo  = aux;

}

elimina(aux :Reclamo){
  Swal.fire({
        title: '¿Estás Seguro?',
        text: "¡No se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Elimínalo'
  }).then((result) => {
      if (result.isConfirmed) {
            this.reclamoService.eliminaDocente(aux.idReclamo).subscribe({
              next: (resp) => {
                Swal.fire('Mensaje',resp.mensaje, 'success');
                this.ngOnInit();
              }
            })

      }
  })
}

  cerrar(){
    this.reclamo = {
      idReclamo: 0,
      descripcion: "",
      estado:1,
      cliente: {
        idCliente: -1,
        nombres: '',
      },
      tipoReclamo:{
        idTipoReclamo:-1,
        descripcion: "",
      }
    }

    this.ngOnInit();
  }

  consulta(){
    this.reclamoService.listaReclamoDescripcion(this.filtro.length == 0? "todos": this.filtro).subscribe(
          {
            next: (resp) => {
              this.reclamosLista = [...resp]
            }
          }
    );
}

  get validaDescripcion() { return this.formsValidacion.get('validaDescripcion'); }

  get validaCliente() { return this.formsValidacion.get('validaCliente'); }

  get validaTipoReclamo() { return this.formsValidacion.get('validaTipoReclamo'); }

  get validaFecha() { return this.formsValidacion.get('validaFecha'); }

  get validaEstado() { return this.formsValidacion.get('validaEstado'); }

}
