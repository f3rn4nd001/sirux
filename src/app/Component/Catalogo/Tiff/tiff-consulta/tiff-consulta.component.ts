import { Component, OnInit,ViewChild } from '@angular/core';
import { TiffService } from "./../../../../service/catalogo/tiff/tiff.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort,Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tiff-consulta',
  templateUrl: './tiff-consulta.component.html',
  styleUrls: ['./tiff-consulta.component.css']
})
export class TiffConsultaComponent implements OnInit {
  public mostrar = true;

  public apro="Catalogo/TIFF/Consulta";
  public permisos="";
  public const =1;
  public submenus: any = {};
  public tipousuario:any = '';
  public loginEcodUsuarios:any = '';
  public entidades: any = {};
  dataSource: any = [];
  dataSourceMovil: any = [];
  public reactiveForm: any = FormGroup;

  columnsToDisplay = ['E','tTif','tNombre','tNombreCorto','Estado','Ciudad','tRFC','tcp'];
  columnsToDisplayMovil= ['E','ecodTiff'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;

  constructor(  
    private _service:TiffService,
    public router: Router,

    ) { }

  ngOnInit(): void {  
    this.Permisos();
    this.getRegistro();
    this.reactiveForm = new FormGroup({
      'tTiff': new FormControl('',[]),
      'tNombre':new FormControl('',[]),
      'tEstado':new FormControl('',[]),
      'tCiudad':new FormControl('',[]),
    });
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
  EditarTif(Params:any){
    localStorage.setItem('ecodTiff', Params);
    this.router.navigate(['Catalogo/TIFF/Registro']);
  }
  getRegistro(){
    this.loginEcodUsuarios = localStorage.getItem('loginEcodUsuarios');    
    this.tipousuario = localStorage.getItem('tipousuario');    
    let data:any={};
    data.loginEcodUsuarios = this.loginEcodUsuarios;
    data.tipousuario = this.tipousuario;
 
    this._service.getRegistros(data).then((response:any)=>{
      this.entidades = (response);
      this.dataSource = new MatTableDataSource(this.entidades);
      this.dataSourceMovil = new MatTableDataSource(this.entidades);    
      this.dataSourceMovil.paginator = this.paginator2;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      })
    }
    RegistrarTiff(){
      this.router.navigate(['Catalogo/TIFF/Registro']);
    }
    mostrarfiltro(){
      this.mostrar = !this.mostrar; 
    }
    filtro(dato:any){
      this.loginEcodUsuarios = localStorage.getItem('loginEcodUsuarios');    
      this.tipousuario = localStorage.getItem('tipousuario');    
      let data:any={};
      data.loginEcodUsuarios = this.loginEcodUsuarios;
      data.tipousuario = this.tipousuario;
      data.filtro=this.reactiveForm.value;
      this._service.getRegistros(data).then((response:any)=>{
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
     
        this.dataSourceMovil = new MatTableDataSource(response);    
        this.dataSourceMovil.paginator = this.paginator2;
      })
    }  
}
