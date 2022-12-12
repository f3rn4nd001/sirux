import { Component, OnInit } from '@angular/core';
import { ViajeService } from "../../../../service/operacion/viaje.service";
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { LoginService } from "../../../../service/Login/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  public ecodViajes:any ='';
  public tipousuario:any ='';
  public submenus: any = {};
  public apro="Operaciones/viaje/DocumentsViajes";
  public permisos="";
  public const =1;
  public viajes: any = {};
  public fileselect?:Blob;
  public imageurl: any = '';
  public ArcgivosformGroup: any = FormGroup;
  public datos: any = {};
  public ContraformGroup: any = FormGroup;
  public logs : any={} 
  public validadContras = 0;
  percentDone?: number;
  uploadSuccess?: boolean;

  constructor(
    public _service : ViajeService,
    public dialog: MatDialog,
    private LoginServices:LoginService,
    public router: Router,

  ) {
   }

  ngOnInit(): void {
   this.getDatas(); 
   this.ContraformGroup = new FormGroup({
    'Contrasena': new FormControl('', Validators.required),
  });
   this.ArcgivosformGroup = new FormGroup({
    'evidenciaEntrega': new FormControl(''),
    }) 
  }
  Guardar(){
    console.log(this.ArcgivosformGroup);
    
  }
  getDatas(){
    this.ecodViajes = localStorage.getItem('ecodViajes');
    this.tipousuario = localStorage.getItem('tipousuario');
    this.Permisos();
    this.getDatos();
  }
  
  Permisos(){
    this.submenus = localStorage.getItem('submenus');    
    this.submenus = JSON.parse(this.submenus); 
    if (this.ecodViajes == null || !this.ecodViajes ) {
      window.history.back();
    }    
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
  getDatos(){
    this._service.getDetalle(this.ecodViajes).then((response:any)=>{      
       this.viajes = (response.sql[0]);
       localStorage.removeItem('ecodViajes');
    }).catch((error)=>{});
  }

  reOperacionesviajeconsulta(){
 this.router.navigate(['Operaciones/viaje/consulta']);
  
  }

}

