import { Component, OnInit } from '@angular/core';
import { UsuarioserviceService } from "../../../../service/catalogo/usuario/usuarioservice.service";
import { FormControl, FormGroup, Validators,FormsModule,FormArray} from '@angular/forms';
import { LoginService } from "../../../../service/Login/login.service";
import { Router } from '@angular/router';
import { GuardarComponent } from "../../../Alerts/guardar/guardar.component";
import {MatDialogModule,MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-eliminar',
  templateUrl: './usuario-eliminar.component.html',
  styleUrls: ['./usuario-eliminar.component.css']
})
export class UsuarioEliminarComponent implements OnInit {
  public permisos="";
  public const =1;
  public submenus: any = {};
  public apro="Consulta/Usuario/Eliminar";
  public validadContras = 0;
  public ecodUsuarios : any = '';
  public datos: any = {};
  public ContraformGroup: any = FormGroup;
  public logs: any={} ;
  public reactiveForm: any = FormGroup;
  public repuesta: any = {};

  constructor(
    public router: Router,
    private _service:UsuarioserviceService,
    private LoginServices:LoginService,
    public dialog: MatDialog,

  ) { }
  ngOnInit(): void {
    this.Permisos();
    this.ecodUsuarios = localStorage.getItem('ecodUsuarios');  
    if (this.ecodUsuarios) {
      this.getDetalles();
    }
    this.ContraformGroup = new FormGroup({
      'Contrasena': new FormControl('', Validators.required),
    });

    this.reactiveForm = new FormGroup({
      'loginEcodUsuarios':new FormControl(localStorage.getItem('loginEcodUsuarios')),
      'ecodUsuarios': new FormControl(this.ecodUsuarios),
      'tMotivo':new FormControl('',[])
    });
  }
  validadContrasena(params:any){
    this.logs.contrasena = params
    this.logs.loginEcodUsuarios= localStorage.getItem('loginEcodUsuarios');
      this.LoginServices.getContra(this.logs).then((response:any)=>{
       this.validadContras = response.sql.dl
      })
    }
  getDetalles(){
    this._service.getDetalle(this.ecodUsuarios).then((response:any)=>{
      let datosUsuarios =(response.sql);   
      this.datos.nombres = datosUsuarios.nombres;   
      this.datos.tApellido = datosUsuarios.tApellido;
      this.datos.tRFC = datosUsuarios.trfc;
      this.datos.ecodUsuarios =datosUsuarios.ecodUsuarios;
      localStorage.removeItem('ecodUsuarios');
    }).catch((error)=>{});
  }
  ConsultaUsuario(){
    this.router.navigate(['Catalogo/usuarios/Consulta']);
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
  Guardar(){
    
    
    let dialogRef = this.dialog.open(GuardarComponent, {
      data: {titulo: "Eliminar", subtitulo: "¿Deseas Eliminar la iformanción?",cancelar: '1'} 
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        let data = this.reactiveForm.value;
        this._service.postEliminar(data).then((response:any)=>{
          this.repuesta.exito = response.exito;
          console.log("eliminnar",this.reactiveForm);
          let dialogRef = this.dialog.open(GuardarComponent, {
            width: '450px',
            data: { titulo: response.exito == 1 ? "Éxito " : "Error", subtitulo: response.exito == 1 ? "La información se guardó exitosamente " : "Ocurrio un error al guardar" }
          });
        }).catch((error)=>{});
        if (this.repuesta.exito == 1) {
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['Catalogo/usuarios/Consulta']);
          });
        }
      }
    });
  }
}
