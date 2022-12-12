import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule,FormArray} from '@angular/forms';
import { ViajeService } from "../../../../service/operacion/viaje.service";
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { ErrorComponent } from '../../../Alerts/error/error.component';
import { GuardarComponent } from '../../../Alerts/guardar/guardar.component';
import {Observable} from 'rxjs';
import {map, startWith, debounce} from 'rxjs/operators';
import { LoginService } from "../../../../service/Login/login.service";


@Component({
  selector: 'app-monitoreoviaje',
  templateUrl: './monitoreoviaje.component.html',
  styleUrls: ['./monitoreoviaje.component.css'],
  providers : [ViajeService],

})

export class MonitoreoviajeComponent implements OnInit {
  public viajes: any = {};
  public dtas: any;
  public datosMonitorViajes:any={};
  public datos: any = {};
  public mensajes: any = {}; 
  public celuraler:any={};
  public ecodViajes : any = '';
  public reactiveForm: any = FormGroup;
  public reactiveFormMasive: any = FormGroup;
  public permisos="";
  public const =1;
  public submenus: any = {};
  public apro="Operaciones/viaje/monitoreoViajes";
  public forMonitoreo = new FormGroup({tMensaje: new FormControl('', [Validators.required]),});
  public cargacontra : any={} 
  public validadContras = 0;
  Cliente = new FormControl();  
  ClienteMovil = new FormControl();  
  opCliente: any[] = [];
  ClienteformGroup = new FormGroup({ClienteControll: new FormControl('',[Validators.required]),});
  filtrarCliente: Observable<any[]>;
  ClienteformGroupMovil = new FormGroup({ClienteControllMovil: new FormControl('',[Validators.required]),});

  filtrarClienteMovil: Observable<any[]>;
  public ContraformGroup: any = FormGroup;

  constructor(  
    public router: Router,
    private _service:ViajeService,
    public dialog: MatDialog,
    private LoginServices:LoginService

  ) { 
    this.filtrarCliente = this.Cliente.valueChanges.pipe(startWith(),map(state => state ? this.filterClientes(state) : this.opCliente.slice()));   
    this.filtrarClienteMovil = this.ClienteMovil.valueChanges.pipe(startWith(),map(state => state ? this.filterClientes(state) : this.opCliente.slice()));   
    
  }

  ngOnInit(): void {
    this.Permisos();
    this.ecodViajes = localStorage.getItem('monitoreoViajes');  
    if (this.ecodViajes) {
      this.getEditarRegistro();
    }
    this.Getcomprementos();
    this.ContraformGroup = new FormGroup({
      'Contrasena': new FormControl('', Validators.required),
    });
    this.reactiveForm = new FormGroup({'Celulares': new FormArray([]),});
    this.reactiveFormMasive = new FormGroup({'MonitorViajesf': new FormArray([]),});
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
  Getcomprementos(){
    this._service.getComplementos().then((response:any)=>{
      response[0].forEach((element:any) => {
        this.opCliente.push({nombres:element.nombres,ecodUsuarios:element.ecodUsuarios})
      });
    }).catch((error)=>{});
  }
  validadContrasena(params:any){
    this.cargacontra.contrasena = params
    this.cargacontra.loginEcodUsuarios= localStorage.getItem('loginEcodUsuarios');
      this.LoginServices.getContra(this.cargacontra).then((response:any)=>{
       this.validadContras = response.sql.dl
      })
    }
  filterClientes(nombres: any) {    
    return this.opCliente.filter(state => state.nombres.toLowerCase().indexOf(nombres) >= 0);
  }

  displayClientes(data: any): string { return data ? data.nombres : data; }
  
  buscarDatosEcodCliente(dato:any){
    if (dato.ecodUsuarios ) {
     let params= dato.ecodUsuarios;
       this._service.getDatosMonitor(params).then((response:any)=>{
        this.datosMonitorViajes=( response.Viajes); 
        this.ReiniciararrCartaporteIndirecto()  
        this.datosMonitorViajes.forEach((icarcore:any) => {
          if(icarcore != null){
            (this.reactiveFormMasive.controls['MonitorViajesf'] as FormArray).push(new FormGroup({
              'tmonitoreo': new FormControl(icarcore.tmonitoreo),
              'treferencia': new FormControl(icarcore.treferencia),
              'tpedido': new FormControl(icarcore.tpedido),
              'operador': new FormControl(icarcore.operador),
              'tOrigen': new FormControl(icarcore.tOrigen),
              'tDestino': new FormControl(icarcore.tDestino),
              'fhLlegada': new FormControl(icarcore.fhLlegada),
              'fhSalida': new FormControl(icarcore.fhSalida),
              'tComentario': new FormControl(''),
              'ecodViaje': new FormControl(icarcore.ecodViaje),
              'ecodCliente': new FormControl(icarcore.ecodCliente),
              'ecodProvedor': new FormControl(icarcore.ecodProvedor),
              'emDestino': new FormControl(icarcore.emDestino),
              'Link': new FormControl(icarcore.Link),
              'municipio': new FormControl(icarcore.municipio),
              'estados': new FormControl(icarcore.estados),
            
            }));
          }
        });   
      }).catch((error)=>{});
    }
    else{this.ReiniciararrCartaporteIndirecto()}
  }

  ReiniciararrCartaporteIndirecto() {
    this.reactiveFormMasive.value.MonitorViajesf.forEach((element:any, index: number) => {   
      this.borrarIndirectoArr();
    }); 
  }
  
  borrarIndirectoArr() {
    this.reactiveFormMasive.controls.MonitorViajesf.removeAt(0);
  }
  
  getEditarRegistro(){
    let params = localStorage.getItem('monitoreoViajes');
    this._service.getDetalle(params).then((response:any)=>{
      this.viajes = (response.sql[0]);
      this.celuraler = (response.celuraler); 
      this.mensajes =(response.resultados);
      localStorage.removeItem('monitoreoViajes');
    }).catch((error)=>{});
  }

  GuardarMasivo() {
    let rdatoImporte: any[] = [];
    if (this.forMonitoreo.value.tMensaje === "") {
      rdatoImporte =  this.reactiveFormMasive.value.MonitorViajesf;
    }
    else{
      this.reactiveFormMasive.value.MonitorViajesf.forEach((element:any) => {        
        rdatoImporte.push({
          ecodViaje: element.ecodViaje,
          tmonitoreo:element.tmonitoreo,
          tComentario:this.forMonitoreo.value.tMensaje,
          ecodCliente: element.ecodCliente,
          treferencia:element.treferencia,
          tpedido:element.tpedido,
          tOrigen:element.tOrigen,
          tDestino:element.tDestino,
          operador:element.operador,
          fhSalida:element.fhSalida,
          fhLlegada:element.fhLlegada,
          ecodProvedor:element.ecodProvedor,
          emDestino:element.emDestino,
          estados:element.estados,
          municipio:element.municipio
        })
      });
    }
    if (rdatoImporte.length > 0) {
      let dialogRef = this.dialog.open(GuardarComponent, {
        data: {titulo: "Guardar", subtitulo: "¿Deseas guardar la información?", cancelar: '1'} 
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this._service.postMonitoreoMasivo(rdatoImporte).then((response:any)=>{
            this.datos.ecodViajes = response.codigo;
            this.datos.exito = response.exito;
            let dialogRef = this.dialog.open(GuardarComponent, {
              width: '450px',
              data: { titulo: response.exito == 1 ? "Éxito " : "Error", subtitulo: response.exito == 1 ? "La información se guardó exitosamente " : "Ocurrio un error al guardar" }
            });
            if (this.datos.exito == 1) {
              dialogRef.afterClosed().subscribe(result => {
                localStorage.removeItem('monitoreoViajes');
                this.router.navigate(['Operaciones/viaje/consulta']);
              });
            }  
          });  
        }
      });
    }
  }
  Guardar() {
    let errorsviaje:any = [];
    let banderamens = 0;
    let bandera = 0;
    let comparardatosviaj:any=[];
    let mensaje:any = this.forMonitoreo.value.tMensaje;
    this.celuraler.forEach((element:any) => {
      if (element.tcelular==null && (this.reactiveForm.value.Celulares.length != 0 || this.reactiveForm.value.Celulares.length == 0 )) {
        errorsviaje.push("No cuenta con un numero de telefono registrado"); 
        bandera=1;
        this.reactiveForm.value.Celulares.forEach((element:any) => {
          if (element.telefono !== '' ) {bandera = 0;}
          else{
            bandera=1;
            errorsviaje.push("Agrege un numero en el campo telefono"); 
          }
        });
      }   
    });
    if (!this.forMonitoreo.value.tMensaje) {
      banderamens=1;
      errorsviaje.push("El campo comentario es requerido");
    }
    comparardatosviaj.push({
      viajes: this.viajes,
      celuraler:  this.celuraler,
      mensajes: mensaje,
      newCel: this.reactiveForm.value.Celulares
    })  
    if (banderamens == 1 || bandera == 1) {
      let dialogRef = this.dialog.open(ErrorComponent, {
        data: { titulo: "Revise los campos marcados en rojo", listado: errorsviaje } 
      });
    }
    if (banderamens==0 && bandera ==0) {
      let dialogRef = this.dialog.open(GuardarComponent, {
        data: {titulo: "Guardar", subtitulo: "¿Deseas guardar la información?", cancelar: '1'} 
      });
      dialogRef.afterClosed().subscribe(result => {
				if (result == 1) {
          this._service.postMonitoreo(comparardatosviaj).then((response:any)=>{
            this.datos.ecodViajes = response.codigo;
            this.datos.exito = response.exito;
						let dialogRef = this.dialog.open(GuardarComponent, {
							width: '450px',
							data: { titulo: response.exito == 1 ? "Éxito " : "Error", subtitulo: response.exito == 1 ? "La información se guardó exitosamente " : "Ocurrio un error al guardar" }
						});
            if (this.datos.exito == 1) {
              dialogRef.afterClosed().subscribe(result => {
                localStorage.removeItem('monitoreoViajes');
                this.router.navigate(['Operaciones/viaje/consulta']);
              });
            }  
           })  
        }
      });     
    }
  }

  reOperacionesviajeconsulta(){
    localStorage.removeItem('monitoreoViajes');
    this.router.navigate(['Operaciones/viaje/consulta']);
  }
   annadirinputCel() {
    (this.reactiveForm.controls['Celulares']).push(new FormGroup({
      'telefono': new FormControl('', Validators.required)
    }));
  }
  eliminarinputCel(index: number) {
    (this.reactiveForm.controls['Celulares']).removeAt(index);
  }
  
}
