import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioserviceService } from "../../../../service/catalogo/usuario/usuarioservice.service";
import { UsuarioDetallesComponent } from '../usuario-detalles/usuario-detalles.component';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule,FormArray} from '@angular/forms';
import { filter } from 'rxjs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort,Sort} from '@angular/material/sort';
import { GuardarComponent } from "../../../Alerts/guardar/guardar.component";
import { PDFComponent } from "../../../Alerts/pdf/pdf.component";

@Component({
  selector: 'app-usuario-consulta',
  templateUrl: './usuario-consulta.component.html',
  styleUrls: ['./usuario-consulta.component.css']
})
export class UsuarioConsultaComponent implements OnInit {
  public mostrar = true;
  public usuarios: any = {};
  public apro="Catalogo/usuarios/Consulta";
  public permisos="";
  public const =1;
  public viajes: any = {};
  public submenus: any = {};
  public reactiveForm: any = FormGroup;
  dataSourceMovil: any = [];
  opCliente: any[] = [];
  dataSource: any = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  columnsToDisplay = ['E','estatus','trfc','nombres'];
  columnsToDisplayMovil= ['E','Nombre'];
 
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private _service:UsuarioserviceService,
  ) { }
  
  ngOnInit(): void {
    this.Permisos();
    this.reactiveForm = new FormGroup({
      'trfc': new FormControl('',[]),
      'Nombre': new FormControl('', []),
      'ecodUsuarios': new FormControl('', []),
      'estatus': new FormControl('', []),
    });
   this.getRegistrosusuarios();
  }
 
  getRegistrosusuarios(){
    this._service.getRegistro().then((response:any)=>{
      this.usuarios = (response)    
      this.usuarios.forEach((element:any) => {
        this.opCliente.push({
          nombres:element.nombres,
          trfc:element.trfc,
          fCreacion:element.fCreacion,
          ecodUsuarios:element.ecodUsuarios.toString(),
          estatus:element.estatus})
      });
      this.dataSource = new MatTableDataSource(this.usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSourceMovil = new MatTableDataSource(this.usuarios);
      this.dataSourceMovil.paginator = this.paginator;
    }).catch((error)=>{});
  }
   
  Permisos(){
    this.submenus = localStorage.getItem('submenus');    
    this.submenus = JSON.parse(this.submenus);     
    if (this.submenus) {
      this.submenus.forEach((element:any) => {  
        if (element.url === this.apro ) {
         this.const = 0;
         this.permisos=element.permisosNCorto
        }
     });
    } 
    if (this.const == 1) {
      this.router.navigate(['/']);
    }
  }

  registrarUsusario(){this.router.navigate(['Consulta/Usuario/Registrar']);}

  mostrarfiltro(){this.mostrar = !this.mostrar;}
  
  filtro(dato:any){
    this.dataSource = this.opCliente.filter(state => state.trfc.toLowerCase().indexOf( this.reactiveForm.value.trfc.toLowerCase()) >= 0)
    .filter(state => state.nombres.toLowerCase().indexOf( this.reactiveForm.value.Nombre.toLowerCase()) >= 0)
    .filter(state => state.ecodUsuarios.toLowerCase().indexOf( this.reactiveForm.value.ecodUsuarios.toLowerCase()) >= 0)
    .filter(state => state.estatus.toLowerCase().indexOf( this.reactiveForm.value.estatus.toLowerCase()) >= 0);
  }

  DetalleViaje(Params:any) {  
    this._service.getDetalle(Params).then((response:any)=>{
      
      let dialogRef = this.dialog.open(UsuarioDetallesComponent, {
        data: { titulo: "Detalle de usuario",usuario:response.sql, relcelres:response.relcelres,relMailres:response.relMailres}
      });
      dialogRef.afterClosed().subscribe(result => { 
        Params=""           
      });
    }).catch((error)=>{});
  }

  REdireccionarEditarUsurio(Params:any)
  {
    localStorage.setItem('ecodUsuarios', Params);
    this.router.navigate(['Consulta/Usuario/Registrar']);
  }

  REdireccionarEliminars(Params:any){
    localStorage.setItem('ecodUsuarios', Params);
    this.router.navigate(['Consulta/Usuario/Eliminar']);
  }

  helpEditar(){
    let dialogRef = this.dialog.open(PDFComponent, {
      data: { titulo: "Manual de usuario",subtitulo:"Editar un usuario",pdfSrc:"../../../../../assets/Catalogo/Manual de usuario Editar ususrio.pdf"}
    });
  }

  helpEliminar(){
    let dialogRef = this.dialog.open(PDFComponent, {
      data: { titulo: "Manual de usuario",subtitulo:"Eliminar un usuario",pdfSrc:"../../../../../assets/Catalogo/Manual de usuario para eliminar un usuario.pdf"}
    });
  }

  helpRegistro(){
    let dialogRef = this.dialog.open(PDFComponent, {
      data: { titulo: "Manual de usuario",subtitulo:"Registrar un usuario",pdfSrc:"../../../../../assets/Catalogo/Manual de usuario para registro de usuario.pdf"}
    });
  }

}