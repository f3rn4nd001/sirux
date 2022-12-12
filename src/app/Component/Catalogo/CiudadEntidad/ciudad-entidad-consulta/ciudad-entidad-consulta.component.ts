import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { TiffService } from "./../../../../service/catalogo/tiff/tiff.service";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort,Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-ciudad-entidad-consulta',
  templateUrl: './ciudad-entidad-consulta.component.html',
  styleUrls: ['./ciudad-entidad-consulta.component.css']
})
export class CiudadEntidadConsultaComponent implements OnInit {
  public apro="Catalogo/CiudadesEntidades/Consulta";
  public permisos="";
  public const =1;
  public submenus: any = {};
  public tipousuario:any = '';
  public loginEcodUsuarios:any = '';
  public entidades: any = {};
  dataSource: any = [];
  columnsToDisplay = ['ecodestadosmunicipios','Estado','Municipio'];
 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private _service:TiffService,
  ) { }

  ngOnInit(): void {
    this.Permisos();
    this.getRegistros();
  }
 Permisos(){
    this.submenus = localStorage.getItem('submenus');    
    this.submenus = JSON.parse(this.submenus);     
    if(this.submenus) {
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

  getRegistros(){
    this.loginEcodUsuarios = localStorage.getItem('loginEcodUsuarios');    
    this.tipousuario = localStorage.getItem('tipousuario');    
    let data:any={};
    data.loginEcodUsuarios = this.loginEcodUsuarios;
    data.tipousuario = this.tipousuario;
 
    this._service.getMunicipiosentidades(data).then((response:any)=>{
      this.entidades = (response);
      this.dataSource = new MatTableDataSource(this.entidades);
      this.dataSource.paginator = this.paginator;
      
      })
  }

}
