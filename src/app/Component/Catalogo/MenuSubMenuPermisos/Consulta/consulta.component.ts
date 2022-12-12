import { Component, OnInit,ViewChild } from '@angular/core';
import { UsuarioserviceService } from "../../../../service/catalogo/usuario/usuarioservice.service";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  public apro="Catalogo/MenuSubmenu/Consulta";
  public permisos="";
  public submenus: any = {};
  public const =1;
  public catControladores :any = [];
  public spinnerCatmenus : boolean = false;
  public catmenus :any = [];
  public catsubmenus :any = [];
  public catPermisos :any = [];
  dataCatmenus: any = [];
  dataCatsubmenus: any = [];
  dataCatControladores: any = [];
  dataCtPermisos: any = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  columnsToDisplayCatmenus = ['E','ecodMenu','tNombre'];
  columnsToDisplayCatsubmenus = ['E','ecodSubMenu','tNombre','url'];
  columnsToDisplayCatControladores = ['E','ecodController','tNombre','url'];
  columnsToDisplayCatPermisos = ['E','ecodPermisos','tNombre'];

  constructor(
    public Usuarioservice : UsuarioserviceService,

  ) {
    
   }

  ngOnInit(): void {
    this.Permisos();
    this.getcomprementos();
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
      window.history.back();
    }
  }
 
  getcomprementos(){
    this.Usuarioservice.getMenuSubmenus().then((response:any)=>{
      this.catsubmenus= response.sqlselectcatsubmenu  
      this.dataCatsubmenus = new MatTableDataSource(this.catsubmenus);
      this.dataCatsubmenus.paginator = this.paginator;
      this.dataCatsubmenus.sort = this.sort;

      this.catmenus = response.sqlselectcatmenu
       this.dataCatmenus = new MatTableDataSource(this.catmenus);
      this.dataCatmenus.paginator = this.paginator;
      this.dataCatmenus.sort = this.sort;

    
      this.catControladores = response.sqlselectcatcontroller
      this.dataCatControladores = new MatTableDataSource(this.catControladores);
      this.dataCatControladores.paginator = this.paginator;
      this.dataCatControladores.sort = this.sort;
      
      this.catPermisos = response.sqlselectcatpermisos
      this.dataCtPermisos = new MatTableDataSource(this.catPermisos);
      this.dataCtPermisos.paginator = this.paginator;
      this.dataCtPermisos.sort = this.sort;
       
      this.spinnerCatmenus = false;
      
    })
  }
  registrarMEnusSubmenus(){
    console.log("datosregist");
    
  }
}
