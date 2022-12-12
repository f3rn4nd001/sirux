import { Component, OnInit } from '@angular/core';
import { TiffService } from "../../../../service/catalogo/tiff/tiff.service";
import { FormControl, FormGroup,Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';
import { LoginService } from "../../../../service/Login/login.service";
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith, debounce} from 'rxjs/operators';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { ErrorComponent } from '../../../Alerts/error/error.component';
import { GuardarComponent } from '../../../Alerts/guardar/guardar.component';
@Component({
  selector: 'app-tiff-registro',
  templateUrl: './tiff-registro.component.html',
  styleUrls: ['./tiff-registro.component.css']
})
export class TiffRegistroComponent implements OnInit {
  public permisos="";
  public const =1;
  public submenus: any = {};
  public apro="Catalogo/TIFF/Registro";
  public ecodTiff : any = '';
  Comprementos: string[] = [];
  opMunicipios: any[] = [];
  public ContraformGroup: any = FormGroup;
  public NuevoTiffformGroup: any = FormGroup;
  ecodEntidades = new FormControl();  
  ecodMunicipios = new FormControl();
  ecodEntidadesMovil = new FormControl();  
  ecodMunicipiosMovil =new FormControl();
  opEntidade: any[] = [];
  filtrarEntidade: Observable<any[]>;
  filtrarMunicipios: Observable<any[]>;
  public logs : any={};
  public validadContras = 0;
  public datos: any = {};
  public data:any={};
  public datosTiff :any={};

  constructor(
    public router: Router,
    public _service:TiffService,
    private LoginServices:LoginService,
    public dialog: MatDialog,

  ) {
    this.filtrarEntidade = this.ecodEntidades.valueChanges.pipe(startWith(),map(state => state ? this.filterEntidades(state) : this.opEntidade.slice()));
    this.filtrarMunicipios = this.ecodMunicipios.valueChanges.pipe(startWith(),map(state => state ? this.filterMunicipios(state) : this.opMunicipios.slice()));
    this.filtrarEntidade = this.ecodEntidadesMovil.valueChanges.pipe(startWith(),map(state => state ? this.filterEntidades(state) : this.opEntidade.slice()));
    this.filtrarMunicipios = this.ecodMunicipiosMovil.valueChanges.pipe(startWith(),map(state => state ? this.filterMunicipios(state) : this.opMunicipios.slice()));
  }
  filterEntidades(event: any) {   
    return this.opEntidade.filter(state => state.nombres.toLowerCase().indexOf(event) >= 0);
  }
  filterMunicipios(event: any) {   
    return this.opMunicipios.filter(state => state.nombres.toLowerCase().indexOf(event) >= 0);
  }
  displayMunicipios(data: any): string { return data ? data.nombres : data; }
  displayEntidades(data: any): string { return data ? data.nombres : data; }

  ngOnInit(): void {
    this.Permisos();
    this.ecodTiff = localStorage.getItem('ecodTiff');  
    if (this.ecodTiff) {
      this.getEditarRegistro();
    }
    this.getcomprenento();
    this.ContraformGroup = new FormGroup({
      'Contrasena': new FormControl('', Validators.required),
    });

    this.NuevoTiffformGroup = new FormGroup({
      'ecodTif':new FormControl('',[]),
      'tTiff': new FormControl('', [Validators.required]),
      'tNombre': new FormControl('', [Validators.required]),
      'ecodEntidades': new FormControl('', [Validators.required]),
      'ecodMunicipios': new FormControl('', [Validators.required]),
      'tNpmbreCorto':new FormControl('',),
      'tRFC':new FormControl('',),
      'tCP':new FormControl('',),
      'ecodEstatus':new FormControl('',[Validators.required]),
      'tDireccion':new FormControl('',[])
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
    this.logs.contrasena = params
    this.logs.loginEcodUsuarios= localStorage.getItem('loginEcodUsuarios');
      this.LoginServices.getContra(this.logs).then((response:any)=>{
       this.validadContras = response.sql.dl
    })
  }
  getEditarRegistro(){
    this._service.getDetalle(this.ecodTiff).then((response:any)=>{
     
      this.datosTiff=(response.sql[0]);   
      this.datos.ecodTif = this.datosTiff.ecodTif; 
      this.datos.tTiff = this.datosTiff.tTif;
      this.datos.tNombre = this.datosTiff.tNombre;
      this.datos.tNpmbreCorto = this.datosTiff.tNombreCorto;
      this.datos.tRFC = this.datosTiff.tRFC;
      this.datos.tCP = this.datosTiff.tcp;
      this.datos.tDireccion=this.datosTiff.tDireccion;
      this.datos.ecodMunicipios = ({nombres:this.datosTiff['Ciudad'], ecodmunicipios:this.datosTiff['ecodCiudad']});
      this.datos.ecodEntidades = ({nombres:this.datosTiff['Estado'], ecodestados:this.datosTiff['ecodEstado']});
      this.datos.ecodEstatus = this.datosTiff.ecodEstatus
      localStorage.removeItem('ecodTiff');
    
    })
  }

  getcomprenento(){
    let datas='';
    const map = new Map();
    this._service.getMunicipiosentidades(datas).then((response:any)=>{
      this.Comprementos = (response)  
      this.Comprementos.forEach((element:any) => {
        this.opMunicipios.push({
          nombres:element.Municipio,
          ecodmunicipios:element.ecodmunicipios
        });
        if(!map.has(element.Estado )){ 
          map.set(element.Estado, true);    // set any value to Map
          this.opEntidade.push({
            nombres:element.Estado,
            ecodestados:element.ecodestados,
          });
        }
    });
    }).catch((error)=>{});
  }

  redirecTIFFConsulta(){
    this.router.navigate(['Catalogo/TIFF/Consulta']);
  }

  Guardar(){
    let bandera = 1;
    let errorsviaje = [];
    this.NuevoTiffformGroup.value.ecodEntidades= this.ecodEntidades.value;
    this.NuevoTiffformGroup.value.ecodMunicipios= this.ecodMunicipios.value;
    this.NuevoTiffformGroup.value.ecodTiffv= this.ecodTiff; 

   if (!this.NuevoTiffformGroup.value.ecodEstatus) {
    errorsviaje.push("El estatus es requerido");
    bandera = 0;
   }
    if (!this.NuevoTiffformGroup.value.tNombre) {
      errorsviaje.push("El nombre es requerido");
      bandera = 0;
    }
      
    if (!this.NuevoTiffformGroup.value.ecodEntidades) {
      errorsviaje.push("La entidad es requerido");
      bandera = 0;
    }  
    if (this.NuevoTiffformGroup.value.ecodEntidades) {
        if (!this.NuevoTiffformGroup.value.ecodEntidades.ecodestados) {
          errorsviaje.push("Seleccione un estado");
          bandera = 0;
         
      }
    }

    if (!this.NuevoTiffformGroup.value.ecodMunicipios) {
      errorsviaje.push("El municipio es requerido");
      bandera = 0;
    }  
    if (this.NuevoTiffformGroup.value.ecodMunicipios) {     
        if (!this.NuevoTiffformGroup.value.ecodMunicipios.ecodmunicipios) {
          errorsviaje.push("Seleccione un municipio");
          bandera = 0;
      }
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
          this.data = this.NuevoTiffformGroup.value;  
          this.data.datosTiff= this.datosTiff;
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
                this.router.navigate(['Catalogo/TIFF/Consulta']);
              });
            }
          }) 
        }
      });
    }


  }
}
