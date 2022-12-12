import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ViajeService } from "../../../../service/operacion/viaje.service";
import {map, startWith, debounce} from 'rxjs/operators';
import { ErrorComponent } from '../../../Alerts/error/error.component';
import { GuardarComponent } from '../../../Alerts/guardar/guardar.component';
import { LoginService } from "../../../../service/Login/login.service";
@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.component.html',
  styleUrls: ['./nuevo-viaje.component.css']
})
export class NuevoViajeComponent implements OnInit {
  ecodClientes = new FormControl();  
  ecodOperados =new FormControl();
  ecodtifforigen = new FormControl();  
  ecodNombreOrigen =new FormControl();
  ecodtiffDestino = new FormControl();  
  ecodNombreDestino =new FormControl();
  ecodClientesMovil = new FormControl();  
  ecodOperadosMovil =new FormControl();
  ecodtifforigenMovil = new FormControl();  
  ecodNombreOrigenMovil =new FormControl();
  ecodtiffDestinoMovil = new FormControl();  
  ecodNombreDestinoMovil =new FormControl();
  
  public datos: any = {};
  public ecodViaje : any = '';
  public permisos="";
  public const =1;
  public submenus: any = {};
  public validadContras = 0;
  public log : any={} 
  public apro="Operaciones/viaje/nuevoViaje";
  public nuevoviajeformGroup: any = FormGroup;
  public ContraformGroup: any = FormGroup;
  public datosViajes :any={};
  public data:any={};
  Operador = new FormControl();  
  Referencia = new FormControl();
  checkmonitor = new FormControl();
  Pedido = new FormControl();  
  Origen = new FormControl();  
  Destino = new FormControl();  
  fhSalida= new FormControl();
  fhLlega= new FormControl();
  filtrarCliente: Observable<any[]>;
  filtrarOperador: Observable<any[]>;
  filtrarTiffOrigen: Observable<any[]>;
  filtrarNombreOrigen: Observable<any[]>;
  filtrarTiffDestino: Observable<any[]>;
  filtrarNombreDestino: Observable<any[]>;
  opCliente: any[] = [];
  Comprementos: string[] = [];
  comprementostiff: string[] = [];
  optifforig: any[] = [];

  public tipousuario:any = '';
  public loginEcodUsuarios:any = '';
  constructor(  
    public router: Router,
    private _service:ViajeService,
    public dialog: MatDialog,
    private LoginServices:LoginService
  ) 
  { 
    this.filtrarCliente = this.ecodClientes.valueChanges.pipe(startWith(),map(state => state ? this.filterClientes(state) : this.opCliente.slice()));   
    this.filtrarOperador = this.ecodOperados.valueChanges.pipe(startWith(),map(state => state ? this.filterOperador(state) : this.opCliente.slice()));
    this.filtrarCliente = this.ecodClientesMovil.valueChanges.pipe(startWith(),map(state => state ? this.filterClientes(state) : this.opCliente.slice()));   
    this.filtrarOperador = this.ecodOperadosMovil.valueChanges.pipe(startWith(),map(state => state ? this.filterOperador(state) : this.opCliente.slice()));  
    this.filtrarTiffOrigen = this.ecodtifforigen.valueChanges.pipe(startWith(),map(state => state ? this.filteTiffOrigen(state) : this.optifforig.slice()));   
    this.filtrarNombreOrigen = this.ecodNombreOrigen.valueChanges.pipe(startWith(),map(state => state ? this.filteTiffOrigen(state) : this.optifforig.slice()));   
    this.filtrarTiffDestino = this.ecodtiffDestino.valueChanges.pipe(startWith(),map(state => state ? this.filteTiffDestino(state) : this.optifforig.slice()));   
    this.filtrarNombreDestino = this.ecodNombreDestino.valueChanges.pipe(startWith(),map(state => state ? this.filteNombreDestino(state) : this.optifforig.slice()));   
    this.filtrarTiffOrigen = this.ecodtifforigenMovil.valueChanges.pipe(startWith(),map(state => state ? this.filteTiffOrigen(state) : this.optifforig.slice()));   
    this.filtrarNombreOrigen = this.ecodNombreOrigenMovil.valueChanges.pipe(startWith(),map(state => state ? this.filteTiffOrigen(state) : this.optifforig.slice()));   
    this.filtrarTiffDestino = this.ecodtiffDestinoMovil.valueChanges.pipe(startWith(),map(state => state ? this.filteTiffDestino(state) : this.optifforig.slice()));   
    this.filtrarNombreDestino = this.ecodNombreDestinoMovil.valueChanges.pipe(startWith(),map(state => state ? this.filteNombreDestino(state) : this.optifforig.slice()));  
  }

  filterClientes(event: any) {   
    return this.opCliente.filter(state => state.nombres.toLowerCase().indexOf(event) >= 0);
  }

  filteTiffOrigen(event: any) {   
    return this.optifforig.filter(state => state.tTif.toLowerCase().indexOf(event) >= 0);
  }
  filteNombreOrigen(event: any) {   
    return this.optifforig.filter(state => state.tNombre.toLowerCase().indexOf(event) >= 0);
  }
  filteTiffDestino(event: any) {   
    return this.optifforig.filter(state => state.tTif.toLowerCase().indexOf(event) >= 0);
  }
  filteNombreDestino(event: any) {   
    return this.optifforig.filter(state => state.tNombre.toLowerCase().indexOf(event) >= 0);
  }
  filterOperador(nombres: any) {
    return this.opCliente.filter(state => state.nombres.toLowerCase().indexOf(nombres) >= 0);
  }
  
  displayClientes(data: any): string { return data ? data.nombres : data; }
  displayTiffOrigen(data: any): string { return data ? data.tTif : data; }
  displayTnombreOrigen(data: any): string { return data ? data.tNombre : data; }
  displayTiffDestino(data: any): string { return data ? data.tTif : data; }
  displayTnombreDestino(data: any): string { return data ? data.tNombre : data; }
   
  ngOnInit(): void {
    this.Permisos();
    this.ecodViaje = localStorage.getItem('ecodViaje');  
    if (this.ecodViaje) {
      this.getEditarRegistro();
    }
    this.getcomprenento();
    this.ContraformGroup = new FormGroup({
      'Contrasena': new FormControl('', Validators.required),
    });
    this.nuevoviajeformGroup = new FormGroup({
      'treferencia': new FormControl('', Validators.required),
      'tpedido': new FormControl('', [Validators.required]),
      'tcliente': new FormControl('', [Validators.required]),
      'ecodOperados': new FormControl('', [Validators.required]),
      'ecodClientes': new FormControl('', [Validators.required]),
      'tDestino': new FormControl('', [Validators.required]),
      'fhSalida': new FormControl('', ),
      'fhLlegada': new FormControl('', ),
      'checkmonitor': new FormControl('', ),
      'tincidentes':new FormControl('',),
      'ecodProvedor':new FormControl('',),
      'tTipoViaje':new FormControl('',),
      'tTipoGasto':new FormControl('',),
      'Link':new FormControl('',),
      'ecodEstatus':new FormControl('',),
      'ecodtifforigen':new FormControl('',),
      'ecodNombreOrigen':new FormControl('',)
    });
  }

  Permisos(){
    this.submenus = localStorage.getItem('submenus');    
    this.submenus = JSON.parse(this.submenus);     
    if (this.submenus) {
      this.submenus.forEach((element:any) => {  
        if (element.controller === this.apro ) {
         this.const = 0;
         this.permisos=element.permisosNCorto
        }
     });
    } 
   
    if (this.const == 1) {
      window.history.back();
    }
  }
  validadContrasena(params:any){
  this.log.contrasena = params
  this.log.loginEcodUsuarios= localStorage.getItem('loginEcodUsuarios');
    this.LoginServices.getContra(this.log).then((response:any)=>{
     this.validadContras = response.sql.dl
    })
  }
  getcomprenento(){
    this._service.getComplementos().then((response:any)=>{
      this.Comprementos = (response[0])  
      this.Comprementos.forEach((element:any) => {
        this.opCliente.push({nombres:element.nombres,ecodUsuarios:element.ecodUsuarios})
      });
    }).catch((error)=>{});

    this.loginEcodUsuarios = localStorage.getItem('loginEcodUsuarios');    
    this.tipousuario = localStorage.getItem('tipousuario');    
    let data:any={};
    data.loginEcodUsuarios = this.loginEcodUsuarios;
    data.tipousuario = this.tipousuario;   
    this._service.getComplementosTiff(data).then((response:any)=>{
      this.comprementostiff = (response)  
      this.comprementostiff.forEach((element:any) => {
        this.optifforig.push({
          tTif:element.tTif,
          tNombre:element.tNombre,
          ecodTif:element.ecodTif})
      });
    }).catch((error)=>{});
  }

  reOperacionesviajeconsulta(){
    this.router.navigate(['Operaciones/viaje/consulta']);
  }

  getEditarRegistro(){
    this._service.getDetalle(this.ecodViaje).then((response:any)=>{
      this.datosViajes =(response.sql[0]);   
      this.datos.treferencia = this.datosViajes.treferencia;   
      this.datos.tpedido = this.datosViajes.tpedido;
      this.datos.tcliente = this.datosViajes.cliente;
      this.datos.ecodClientes = ({nombres:this.datosViajes['cliente'], ecodUsuarios:this.datosViajes['ecodCliente']});
      this.datos.ecodOperados = ({nombres:this.datosViajes['operador'], ecodUsuarios:this.datosViajes['ecodOperados']});
      this.datos.ecodtifforigen = ({tTif:this.datosViajes['tTif'], ecodTif:this.datosViajes['tOrigen']});
      this.datos.ecodtiffDestino = ({tTif:this.datosViajes['tiffdestino'], ecodTif:this.datosViajes['tDestino']});
      this.datos.ecodProvedor =  this.datosViajes.ecodProvedor;
      this.datos.fhLlegada = this.datosViajes.fhLlegada;
      this.datos.fhSalida = this.datosViajes.fhSalida;
      this.datos.tmonitoreo = this.datosViajes.tmonitoreo;
      this.datos.tTipoViaje = this.datosViajes.tTipoViaje;
      this.datos.tTipoGasto = this.datosViajes.tTipoGasto;
      this.datos.Link = this.datosViajes.Link;
      this.datos.ecodEstatus = this.datosViajes.EcodEstatus;
      localStorage.removeItem('ecodViaje');
         
    }).catch((error)=>{}); 
  }

  Guardar(){
    let bandera = 1;
    let errorsviaje = [];
    this.nuevoviajeformGroup.value.ecodClientes=this.ecodClientes.value;
    this.nuevoviajeformGroup.value.ecodOperados=this.ecodOperados.value;
    this.nuevoviajeformGroup.value.ecodViaje=this.ecodViaje; 
    this.nuevoviajeformGroup.value.ecodtifforigen=this.ecodtifforigen.value;
    this.nuevoviajeformGroup.value.ecodNombreOrigen=this.ecodNombreOrigen.value;
    this.nuevoviajeformGroup.value.ecodtiffDestino=this.ecodtiffDestino.value;
    this.nuevoviajeformGroup.value.ecodNombreDestino=this.ecodNombreDestino.value;
    
    if (!this.nuevoviajeformGroup.value.treferencia) {
      errorsviaje.push("La Referencia es requerida");
      bandera = 0;
    }
    if (!this.nuevoviajeformGroup.value.ecodEstatus) {
      errorsviaje.push("El Estatus es requerida");
      bandera = 0;
    }
    if (!this.nuevoviajeformGroup.value.tpedido) {
      errorsviaje.push("El Pedido es requerido");
      bandera = 0;
  
    }
    if (!this.nuevoviajeformGroup.value.ecodClientes) {
      errorsviaje.push("El Cliente es requerido");
      bandera = 0;
    }  
    if (this.nuevoviajeformGroup.value.ecodClientes) {     
        if (!this.nuevoviajeformGroup.value.ecodClientes.ecodUsuarios) {
          errorsviaje.push("Seleccionar una Cliente");
          bandera = 0;
      }
    }
    if (this.nuevoviajeformGroup.value.ecodOperados) {
      if (!this.nuevoviajeformGroup.value.ecodOperados.ecodUsuarios) {
        errorsviaje.push("Seleccionar una Operador");
        bandera = 0;
      }
    }
    if (!this.nuevoviajeformGroup.value.ecodOperados) {
      errorsviaje.push("EL Operador es requerido");
      bandera = 0;
    }  

    if (bandera==0) {
      let dialogRef = this.dialog.open(ErrorComponent, {
        data: { titulo: "Revise los campos marcados en rojo", listado: errorsviaje } 
      });
    }
    if (bandera == 1) {
      let dialogRef = this.dialog.open(GuardarComponent, {
        data: {titulo: "Guardar", subtitulo: "¿Deseas guardar la información?", cancelar: '1'} 
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.data = this.nuevoviajeformGroup.value;  
          this.data.datosViajes= this.datosViajes;
          this.data.loginEcodUsuarios= localStorage.getItem('loginEcodUsuarios');

          
          this._service.postRegistro(this.data).then((response:any)=>{
            this.datos.exito = response.exito;
            this.datos.eCodTarifaCombustible = response.codigo;
            let dialogRef = this.dialog.open(GuardarComponent, {
              width: '450px',
              data: { titulo: response.exito == 1 ? "Éxito " : "Error", subtitulo: response.exito == 1 ? "La información se guardó exitosamente " : "Ocurrio un error al guardar" }
            });
            if (this.datos.exito == 1) {
              dialogRef.afterClosed().subscribe(result => {
                this.router.navigate(['Operaciones/viaje/consulta']);
              });
            }
          }) 
        }
      });
    }
  }
 
  validadREferencia(dato:any){
    let errorsviaje:any = [];
    let bandera = 1;
    let cadena:any = this.datos.treferencia;
    if (!this.ecodViaje || this.ecodViaje == 'null') {
   /*  this._service.geRferencia(cadena).then((response:any)=>{
        let rfcap= response.sql;
        if (rfcap.dl != 0) {
         errorsviaje.push("El RFC ya existe");
          let dialogRef = this.dialog.open(ErrorComponent, {
            data: { titulo: "Revise los campos marcados en rojo", listado: errorsviaje } 
          });
        } 
       }
      )*/
    }
  }
}
