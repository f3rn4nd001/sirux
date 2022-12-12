import { Component, OnInit,VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule,FormArray} from '@angular/forms';
import { UsuarioserviceService } from "../../../../service/catalogo/usuario/usuarioservice.service";
import { ErrorComponent } from '../../../Alerts/error/error.component';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { GuardarComponent } from '../../../Alerts/guardar/guardar.component';
import { LoginService } from "../../../../service/Login/login.service";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UsuarioDetallesComponent } from '../usuario-detalles/usuario-detalles.component';

@Component({
  selector: 'app-ususario-registro',
  templateUrl: './ususario-registro.component.html',
  styleUrls: ['./ususario-registro.component.css']
})

export class UsusarioRegistroComponent implements OnInit {
  public reactiveForm: any = FormGroup;
  public datos: any = {};
  public ecodUsuarios : any = '';
  public permisos="";
  public const =1;
  public submenus: any = {};
  public apro="Consulta/Usuario/Registrar";
  public validadContras = 0;
  public log : any={} 
  public ContraformGroup: any = FormGroup;

  constructor(
    public router: Router,
    private _service:UsuarioserviceService,
    public dialog: MatDialog,
    private LoginServices:LoginService
  ) { }

  ngOnInit(): void {
    this.Permisos();
    this.ecodUsuarios = localStorage.getItem('ecodUsuarios');  
    if (this.ecodUsuarios) {
      this.getEditarRegistro();
    }
    this.ContraformGroup = new FormGroup({
      'Contrasena': new FormControl('', Validators.required),
    });
    this.reactiveForm = new FormGroup({
      'ecodUsuarios': new FormControl(this.ecodUsuarios),
      'tRFC': new FormControl('', Validators.required),
      'tNombre': new FormControl('', [Validators.required, Validators.email]),
      'tApellido': new FormControl('', [Validators.required, Validators.email]),
      'Celulares': new FormArray([]),
      'Mails': new FormArray([])
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
  getEditarRegistro(){
    this._service.getDetalle(this.ecodUsuarios).then((response:any)=>{
      let datosUsuarios =(response.sql);   
      this.datos.tNombre = datosUsuarios.tNombre;   
      this.datos.tApellido = datosUsuarios.tApellido;
      this.datos.tRFC = datosUsuarios.trfc;
      this.datos.cel= response.relcelres;
      this.datos.cel.forEach((icarcore:any) => {
        if(icarcore.tcelular != null){
          (this.reactiveForm.controls['Celulares'] as FormArray).push(new FormGroup({
              'telefono': new FormControl(icarcore.tcelular),
          }))
        }
      });  
      this.datos.mail= response.relMailres;
      this.datos.mail.forEach((icarcore:any) => {
        if(icarcore.tcorreo != null){
          (this.reactiveForm.controls['Mails'] as FormArray).push(new FormGroup({
              'gmail': new FormControl(icarcore.tcorreo),
              'Codigomail':new FormControl(icarcore.ecodCorreo)
          }))
        }
      }); 
      localStorage.removeItem('ecodUsuarios');
    }).catch((error)=>{});
  }
  annadirinputCel() {
    (this.reactiveForm.controls['Celulares']).push(new FormGroup({
      'telefono': new FormControl('', Validators.required)
    }));
  }
  annadirinputMail() {
    (this.reactiveForm.controls['Mails']).push(new FormGroup({
      'gmail': new FormControl('', Validators.required),
      'Codigomail': new FormControl('', Validators.required)
    }));
  }
  eliminarinputMail(index: number) {
    (this.reactiveForm.controls['Mails']).removeAt(index);
  }
  eliminarinputCel(index: number) {
    (this.reactiveForm.controls['Celulares']).removeAt(index);
  }
  onSubmit() {
    let errorsviaje:any = [];
    let bandera = 1;
    let cadena:any = this.reactiveForm.value.tRFC;
    /*if (cadena.length == 12){
      var valid = '^(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
    }
    else{
      var valid = '^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
    }
    var validRfc=new RegExp(valid);
    var matchArray=cadena.match(validRfc);
    if (matchArray==null) {
      errorsviaje.push("El RFC no es valido");
      bandera = 0;
    }*/
    if (!this.reactiveForm.value.tNombre) {
      errorsviaje.push("El campo 'nombre' es requerido");
      bandera = 0;
    }
    if (bandera == 0) {
      let dialogRef = this.dialog.open(ErrorComponent, {
        data: { titulo: "Revise los campos marcados en rojo", listado: errorsviaje } 
      });
    }
    if (!this.ecodUsuarios || this.ecodUsuarios == 'null') {
    /*  this._service.getRFC(cadena).then((response:any)=>{
        let rfcap= response.sql;
        if (rfcap.dl != 0) {
          bandera = 0;
          errorsviaje.push("El RFC ya existe");
          let dialogRef = this.dialog.open(ErrorComponent, {
            data: { titulo: "Revise los campos marcados en rojo", listado: errorsviaje } 
          });
        }*/ 
        //else{ 
          if (bandera == 1) {
            let dialogRef = this.dialog.open(GuardarComponent, {
              data: {titulo: "Guardar", subtitulo: "¿Deseas guardar la información?", cancelar: '1'} 
            });
            dialogRef.afterClosed().subscribe(result => {
              if (result == 1) {
                let data = this.reactiveForm.value
                this._service.postRegistro(data).then((response:any)=>{
                  this.datos.ecodUsuario = response.codigo;
                  this.datos.exito = response.exito;
                  let dialogRef = this.dialog.open(GuardarComponent, {
                    width: '450px',
                    data: { titulo: response.exito == 1 ? "Éxito " : "Error", subtitulo: response.exito == 1 ? "La información se guardó exitosamente " : "Ocurrio un error al guardar" }
                  });
                  if (this.datos.exito == 1) {
                    dialogRef.afterClosed().subscribe(result => {
                      this._service.getDetalle(this.datos.ecodUsuario).then((response:any)=>{
      
                        let dialogRef = this.dialog.open(UsuarioDetallesComponent, {
                          data: { titulo: "Detalle de usuario",usuario:response.sql, relcelres:response.relcelres,relMailres:response.relMailres}
                        });
                        dialogRef.afterClosed().subscribe(result => { 
                          this.router.navigate(['Catalogo/usuarios/Consulta']);      
                        });
                      }).catch((error)=>{});
                     
                    });
                  }
                }).catch((error)=>{});
              }
            });
          }
       // }
     // })
    }
    else{ 
      if (bandera == 1) {
        let dialogRef = this.dialog.open(GuardarComponent, {
          data: {titulo: "Guardar", subtitulo: "¿Deseas guardar la información?", cancelar: '1'} 
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result == 1) {
            let data = this.reactiveForm.value
            data.loginEcodUsuarios= localStorage.getItem('loginEcodUsuarios');
            this._service.postRegistro(data).then((response:any)=>{
              this.datos.ecodUsuario = response.codigo;
              this.datos.exito = response.exito;
              let dialogRef = this.dialog.open(GuardarComponent, {
                width: '450px',
                data: { titulo: response.exito == 1 ? "Éxito " : "Error", subtitulo: response.exito == 1 ? "La información se guardó exitosamente " : "Ocurrio un error al guardar" }
              });
              if (this.datos.exito == 1) {
                dialogRef.afterClosed().subscribe(result => {
                  this._service.getDetalle(this.datos.ecodUsuario).then((response:any)=>{
      
                    let dialogRef = this.dialog.open(UsuarioDetallesComponent, {
                      data: { titulo: "Detalle de usuario",usuario:response.sql, relcelres:response.relcelres,relMailres:response.relMailres}
                    });
                    dialogRef.afterClosed().subscribe(result => { 
                      this.router.navigate(['Catalogo/usuarios/Consulta']);      
                    });
                  }).catch((error)=>{});
                 
                });
              }
            }).catch((error)=>{});
          }
        });
      }
    }
  }
  validadrfc(dato:any){
    let errorsviaje:any = [];
    let bandera = 1;
    let cadena:any = this.reactiveForm.value.tRFC; 
    if (!this.ecodUsuarios || this.ecodUsuarios == 'null') {
      this._service.getRFC(cadena).then((response:any)=>{
        let rfcap= response.sql;
        if (rfcap.dl != 0) {
         errorsviaje.push("El RFC ya existe");
          let dialogRef = this.dialog.open(ErrorComponent, {
            data: { titulo: "Revise los campos marcados en rojo", listado: errorsviaje } 
          });
        } 
      })
    }
    if (cadena.length == 12){
      var valid = '^(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
      }else{
      var valid = '^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
      }
      var validRfc=new RegExp(valid);
      var matchArray=cadena.match(validRfc);
    if (matchArray==null) {
      alert('Cadena incorrectas');
      return false;
    }
    else{
      return true;
    }   
  }
  mayusculaRFC(dato:any) {
    let cadena:any = this.reactiveForm.value.tRFC;
		let mayusculas = cadena.toUpperCase();
		this.reactiveForm.value.tRFC = (mayusculas);
	}
  ConsultaUsuario(){
    this.router.navigate(['Catalogo/usuarios/Consulta']);
  }
  submit() {
      console.log(this.reactiveForm.value); 
  }
}
