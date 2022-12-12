import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioserviceService } from "../../../../service/catalogo/usuario/usuarioservice.service";
import { UsuarioDetallesComponent } from '../../../Catalogo/usuario/usuario-detalles/usuario-detalles.component';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule,FormArray} from '@angular/forms';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-consultausuarios',
  templateUrl: './consultausuarios.component.html',
  styleUrls: ['./consultausuarios.component.css']
})
export class ConsultausuariosComponent implements OnInit {
  public spinner : boolean = false;
  public apro="Sistemas/usuarios/Consulta";
  public permisos="";
  public const =1;
  public submenus: any = {};
  public mostrar = true;
  public Formfiltro: any = FormGroup;
  public usuarios: any = {};
  dataSource: any = [];
  opCliente: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  columnsToDisplay = ['E','ecodUsuarios','estatus','trfc','nombres'];
 
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private _service:UsuarioserviceService
  ) {
    
   }

   ngOnInit(): void {
    this.Permisos()
    this.Formfiltro = new FormGroup({
      'trfc': new FormControl('',[]),
      'Nombre': new FormControl('', []),
      'ecodUsuarios': new FormControl('', []),
    });
    this._service.getRegistro().then((response:any)=>{
      this.usuarios = (response)    
      this.usuarios .forEach((element:any) => {
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
      this.spinner = false;
  }).catch((error)=>{});
  }
  mostrarfiltro(){this.mostrar = !this.mostrar;}
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

  filtro(dato:any){
    this.dataSource = this.opCliente.filter(state => state.trfc.toLowerCase().indexOf( this.Formfiltro.value.trfc.toLowerCase()) >= 0)
    .filter(state => state.nombres.toLowerCase().indexOf( this.Formfiltro.value.Nombre.toLowerCase()) >= 0)
    .filter(state => state.ecodUsuarios.toLowerCase().indexOf( this.Formfiltro.value.ecodUsuarios.toLowerCase()) >= 0);
  }

    registrarUsusario(){
    this.router.navigate(['/Sistemas/usuarios/Consulta']);
  }
  DetalleUsuarios(Params:any) {  
    this._service.getDetalle(Params).then((response:any)=>{
      
      let dialogRef = this.dialog.open(UsuarioDetallesComponent, {
        data: { titulo: "Detalle de usuario",usuario:response.sql, relcelres:response.relcelres,relMailres:response.relMailres}
      });
      dialogRef.afterClosed().subscribe(result => { 
        Params=""           
      });
    }).catch((error)=>{});
  }
  EditarUsurio(Params:any)
  {
    localStorage.setItem('ecodUsuarios', Params);
    this.router.navigate(['']);
  }
  AsignarPErmisos(Params:any){
    localStorage.setItem('ecodUsuarios', Params);
    this.router.navigate(['Sistemas/usuarios/AsignacionPermisos']);
  }
}
