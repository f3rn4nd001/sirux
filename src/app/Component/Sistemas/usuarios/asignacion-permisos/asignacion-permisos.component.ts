import { Component, OnInit,EventEmitter } from '@angular/core';
import  { Observable } from 'rxjs';
import{ HttpEventType, HttpResponse } from '@angular/common/http';
import { PermisosService } from "../../../../service/sistemas/usuarios/permisos.service";
import { LoginService } from "../../../../service/Login/login.service";
import { FormControl, FormGroup,Validators,FormArray,AbstractControl} from '@angular/forms';
import {map, startWith, debounce} from 'rxjs/operators';
import { UsuarioserviceService } from "../../../../service/catalogo/usuario/usuarioservice.service";
import { Router } from '@angular/router';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { GuardarComponent } from '../../../Alerts/guardar/guardar.component';


@Component({
  selector: 'app-asignacion-permisos',
  templateUrl: './asignacion-permisos.component.html',
  styleUrls: ['./asignacion-permisos.component.css']
})
export class AsignacionPermisosComponent implements OnInit {

  
public permisos="";
public const =1;
public submenus: any = {};
public apro="Consulta/Usuario/AsignacionPermisos";
public FormAsignasion: any = FormGroup;
opMenu: any[] = [];
opSubMenu: any[] = [];
opControladores	: any[] = [];
opPermisos : any[]=[];
ecodMenus = new FormControl();  
ecodsubMenus = new FormControl(); 
ecodControladores = new FormControl(); 
public catControladores :any = [];
public catPermisos:any=[];
public catmenus :any = [];
public catsubmenus :any = [];
public datosUsuarios:any={};
filtrarMenu: Observable<any[]>;
filtrarControladores: Observable<any[]>;
filtrarSubMenu: Observable<any[]>;
public ecodUsuarios : any = '';
public datos: any = {};
public ContraformGroup: any = FormGroup;
public logs : any={} 
public validadContras = 0;

FormMenunssubmenus: any = new FormArray([]);
PermisosForm:any= FormGroup;

  constructor(
    private uploadService: PermisosService,
    public LoginServices : LoginService,
    public Usuarioservice:UsuarioserviceService,
    public router: Router,
    public dialog: MatDialog,
    ) {
      this.filtrarMenu = this.ecodMenus.valueChanges.pipe(startWith(),map(state => state ? this.filterMenus(state,state.i) : this.opMenu.slice()));   
      this.filtrarSubMenu = this.ecodsubMenus.valueChanges.pipe(startWith(),map(state => state ? this.filterSubMenus(state) : this.opSubMenu.slice()));
      this.filtrarControladores = this.ecodControladores.valueChanges.pipe(startWith(),map(state => state ? this.filterControladores(state) : this.opControladores.slice()));
    }
  ngOnInit(): void {
    this.Permisos();
    this.ecodUsuarios = localStorage.getItem('ecodUsuarios');  
   if (this.ecodUsuarios) {
     this.getEditarRegistro();
     this.getPermisos();
   }
    this.FormAsignasion = new FormGroup({
      'formularioarr': new FormArray([]),
    });
    this.ContraformGroup = new FormGroup({
      'Contrasena': new FormControl('', Validators.required),
    });
    this.getcomprementos();

    
  //  this.fileInfos = this.uploadService.getFiles();
  }
  validadContrasena(params:any){
    this.logs.contrasena = params
    this.logs.loginEcodUsuarios= localStorage.getItem('loginEcodUsuarios');
      this.LoginServices.getContra(this.logs).then((response:any)=>{
       this.validadContras = response.sql.dl
      })
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
  filterMenus(event: any,i:any) { 
    return this.opMenu.filter(state => state.nombres.toLowerCase().indexOf(event) >= 0);
  }
  filterSubMenus(event: any) {   
    return this.opSubMenu.filter(state => state.url.toLowerCase().indexOf(event) >= 0);
  }
  filterControladores(event: any) {   
    return this.opControladores.filter(state => state.url.toLowerCase().indexOf(event) >= 0);
  }
  displayMenus(data: any): string { return data ? data.nombres : data; }
  displaySubMenus(data: any): string { return data ? data.url : data; }
  displayControladores(data: any): string { return data ? data.url : data; }
  
  getPermisos(){
    this.uploadService.getRegistrosPermisos(this.ecodUsuarios).then((response:any)=>{
      response.forEach((icarcore:any) => {
          (this.FormMenunssubmenus.controls).push(new FormGroup({
            'ecodRel': new FormControl(icarcore.ecodrelusuarioSubMenu),
            'MenusCtrl': new FormControl(icarcore.ecodMenu),
            'SubmenusCtrl': new FormControl(icarcore.ecodSubMenu),
            'ControladoresCtrl': new FormControl(icarcore.ecodController),
            'TPermisosCtrl': new FormControl(icarcore.ecodPermisos),
      
          }))
      });  
   }).catch((error)=>{}); 
  }
  getEditarRegistro(){ 
    this.Usuarioservice.getDetalle(this.ecodUsuarios).then((response:any)=>{
      this.datosUsuarios =(response.sql);   
   }).catch((error)=>{});
   let data = this.ecodUsuarios
    this.LoginServices.getMenu(this.ecodUsuarios).then((response:any)=>{
  
    }).catch((error)=>{});
  }
  getcomprementos(){
    this.Usuarioservice.getMenuSubmenus().then((response:any)=>{
      this.catmenus = response.sqlselectcatmenu;
      this.catsubmenus= response.sqlselectcatsubmenu;
      this.catControladores=response.sqlselectcatcontroller;
      this.catPermisos=response.sqlselectcatpermisos;
      this.catmenus.forEach((element:any) => {
        this.opMenu.push({nombres:element.tNombre,ecodMenu:element.ecodMenu})
      });
      this.catsubmenus.forEach((element:any) => {
        this.opSubMenu.push({url:element.url,ecodSubMenu:element.ecodSubMenu})
      });
      this.catControladores.forEach((element:any) => {
        this.opControladores.push({url:element.url,ecodController:element.ecodController})
      });
      this.catPermisos.forEach((element:any) => {
        this.opPermisos.push({tNombre:element.tNombre,ecodPermisos:element.ecodPermisos,tNombreCorto:element.tNombreCorto})
      });
    })
    this.addCartaPorteArr();
  }
 
  addCartaPorteArr(i = 0) {
    let errors:any = [];
    if (i != 0) {
        if (errors.length < 1) {
            this.FormMenunssubmenus.push(
                this.PermisosForm = new FormGroup({
                  'ecodRel': new FormControl('',),
                  'MenusCtrl': new FormControl('', [Validators.required]),
                  'SubmenusCtrl': new FormControl('', [Validators.required]),
                  'ControladoresCtrl': new FormControl('', [Validators.required]),
                  'TPermisosCtrl': new FormControl('', [Validators.required]),
                })
            );
        } else {
        }
    }
    else{
        this.FormMenunssubmenus.push(
            this.PermisosForm = new FormGroup({
                'ecodRel': new FormControl('',),
                'MenusCtrl': new FormControl('', [Validators.required]),
                'SubmenusCtrl': new FormControl('', [Validators.required]),
                'ControladoresCtrl': new FormControl('', [Validators.required]),
                'TPermisosCtrl': new FormControl('', [Validators.required]),
               
            })
        );
      
    }
    
}
borrarCartaPorteArr(i:any) {
  this.FormMenunssubmenus.removeAt(i);
}

getControls(formArray: AbstractControl): FormControl[] {
  return <FormControl[]>(<FormArray>formArray).controls
}
consulta(){
  this.router.navigate(['Sistemas/usuarios/Consulta']);
}
Guardar(){

  let dialogRef = this.dialog.open(GuardarComponent, {
    data: {titulo: "Guardar", subtitulo: "¿Deseas guardar la información?", cancelar: '1'} 
  });
  dialogRef.afterClosed().subscribe(result => {
  if (result == 1) {
      let data = this.FormMenunssubmenus.controls
      
      this.uploadService.postRegistro(data).then((response:any)=>{
        this.datos.ecodUsuario = response.codigo;
        this.datos.exito = response.exito;
        let dialogRef = this.dialog.open(GuardarComponent, {
          width: '450px',
          data: { titulo: response.exito == 1 ? "Éxito " : "Error", subtitulo: response.exito == 1 ? "La información se guardó exitosamente " : "Ocurrio un error al guardar" }
        });
       if (this.datos.exito == 1) {
          dialogRef.afterClosed().subscribe(result => {
       /* this.uploadService.getDetalle(this.datos.ecodUsuario).then((response:any)=>{

              let dialogRef = this.dialog.open(UsuarioDetallesComponent, {
                data: { titulo: "Detalle de usuario",usuario:response.sql, relcelres:response.relcelres,relMailres:response.relMailres}
              });
              dialogRef.afterClosed().subscribe(result => { 
                this.router.navigate(['Catalogo/usuarios/Consulta']);      
              });
            }).catch((error)=>{});
          */
          });
        }
      }).catch((error)=>{});
    }
  });

}
}
