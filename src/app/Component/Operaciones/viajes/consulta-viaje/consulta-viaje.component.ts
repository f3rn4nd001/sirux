import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DetalleViajeComponent } from '../detalle-viaje/detalle-viaje.component';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { ViajeService } from "../../../../service/operacion/viaje.service";
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PDFComponent } from "../../../Alerts/pdf/pdf.component";
import {MatSort,Sort} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-consulta-viaje',
  templateUrl: './consulta-viaje.component.html',
  styleUrls: ['./consulta-viaje.component.css'],
  providers : [ViajeService]
})

export class ConsultaViajeComponent implements OnInit {
  defaultFrom = new Date();
  defaultTo = new Date(this.defaultFrom.getTime() + 2 *24 * 60 * 60 * 1000);
  public onDateRangeSelection(range: { from: Date, to: Date }) {
    console.log(`Selected range: ${range.from} - ${range.to}`);
  }
  public mostrar = true;
  public mostrargraficas = true;
  public apro="Operaciones/viaje/consulta";
  public permisos="";
  public const =1;
  public viajes: any = {};
  public submenus: any = {};
  public Params:any={};
  public reactiveForm: any = FormGroup;
  public tipousuario:any = '';
  public loginEcodUsuarios:any = '';
  panelOpenState = false;
  viajestermindo:any;
  ViajesPendientes:any;
  opCliente: any[] = [];    
  dataSource: any = [];
  dataSourceMovil: any = [];
  columnsToDisplay = ['E','ecodViaje','Estatus','treferencia','tpedido','cliente','operador','ecodProvedor','tOrigen','tDestino','fhSalida','fhLlegada','Link'];
  columnsToDisplayMovil= ['E','ecodViaje'];
 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private _service:ViajeService,
  ) { }

  ngOnInit(): void {
    this.Permisos();
   this.reactiveForm = new FormGroup({
      'ecodViaje': new FormControl('',[]),
      'treferencia': new FormControl('', []),
      'tpedido': new FormControl('', []),
      'cliente': new FormControl('', []),
      'operador': new FormControl('', []),
      'tOrigen': new FormControl('', []),
      'tDestino': new FormControl('', []),
      'fhLlegada': new FormControl('', []),
      'fhSalida': new FormControl('', []),
      'fhSalidaInicio': new FormControl('', []),
      'fhSalidaTermino': new FormControl('', []),
      'fhLlegadaInicio': new FormControl('', []),
      'fhLlegadaTermino': new FormControl('', []),
      'Estatus': new FormControl('', []), 
      'tproveedor': new FormControl('', []), 
      
    });
    this.getdatos();
  }

  getdatos(){ 
    this.loginEcodUsuarios = localStorage.getItem('loginEcodUsuarios');    
    this.tipousuario = localStorage.getItem('tipousuario');    
    let data:any={};
    data.loginEcodUsuarios = this.loginEcodUsuarios;
    data.tipousuario = this.tipousuario;
 
    this._service.getRegistro(data).then((response:any)=>{
      this.viajes = (response);
      this.dataSource = new MatTableDataSource(this.viajes);
      this.dataSourceMovil = new MatTableDataSource(this.viajes);    
      this.dataSource.paginator = this.paginator;
      this.dataSourceMovil.paginator = this.paginator2;
      this.dataSource.sort = this.sort;
      let Pendientes = 0;
      let Terminado=0
      this.viajes.forEach((element:any) => {
        if (element.Estatus == 'Terminado') {
          Terminado ++; 
        }
        if (element.Estatus != 'Terminado' && element.Estatus != 'Cancelado') {
          Pendientes ++; 
        }
        this.opCliente.push({
          ecodViaje:element.ecodViaje.toString(),
          treferencia:element.treferencia,
          Estatus:element.Estatus,
          tpedido:element.tpedido,
          cliente:element.cliente,
          operador:element.operador,
          tOrigen:element.tOrigen,
          tDestino:element.tDestino,
          fhLlegada:element.fhLlegada,
          fhSalida:element.fhLlegada,
          tproveedor:element.tproveedor
        })
      });
      let resultpend = 0;
      let resultermin = 0;
      resultpend=(Pendientes / this.viajes.length)*100;
      this.ViajesPendientes=resultpend.toFixed(2);
      resultermin=(Terminado / this.viajes.length)*100;
      this.viajestermindo = resultermin.toFixed(2);
   
    }).catch((error)=>{});
    
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

  reOperacionesviajenuevoViaje(){
    ///Editar permisos ante de redireccionar
    this.router.navigate(['Operaciones/viaje/nuevoViaje']);
  }

  addComprobanteEntrega(Params:any){
    localStorage.setItem('ecodViajes', Params);
    this.router.navigate(['Operaciones/viaje/DocumentsViajes']);
  }
 
  mostrarfiltro(){
    this.mostrar = !this.mostrar; 
  }
 
  mostrarGraficas(){
    this.mostrargraficas = !this.mostrargraficas; 
  }
 
  Monitorearviaje(Params:any)
  {
      localStorage.setItem('monitoreoViajes', Params);
      this.router.navigate(['Operaciones/viaje/monitoreoViajes']);
  }
 
  Monitorearviajes()
  {
      this.router.navigate(['Operaciones/viaje/monitoreoViajes']);
  }
 
  EditarViajes(Params:any)
  {
    localStorage.setItem('ecodViaje', Params);
    this.router.navigate(['Operaciones/viaje/nuevoViaje']);
  }
  
  DetalleViaje(Params:any) {      
    this._service.getDetalle(Params).then((response:any)=>{      
      let dialogRef = this.dialog.open(DetalleViajeComponent, {
        data: { titulo: "Detalle de viaje", viajes:response.sql, mensjerisql:response.resultados, incidenciasArrs:response.incidenciasArr}
      });
      dialogRef.afterClosed().subscribe(result => { 
        Params=""           
      });
    }).catch((error)=>{});
  }

  filtro(dato:any){
    this.loginEcodUsuarios = localStorage.getItem('loginEcodUsuarios');    
    this.tipousuario = localStorage.getItem('tipousuario');    
    let data:any={};
    data.loginEcodUsuarios = this.loginEcodUsuarios;
    data.tipousuario = this.tipousuario;
    data.filtro=this.reactiveForm.value;
    this._service.getRegistro(data).then((response:any)=>{
      let Pendientes = 0;
      let Terminado=0
      response.forEach((element:any) => {
        if (element.Estatus == 'Terminado') {
          Terminado ++; 
        }
        if (element.Estatus != 'Terminado' && element.Estatus != 'Cancelado') {
          Pendientes ++; 
        }
      });
      let resultpend = 0;
      let resultermin = 0;
      resultpend=(Pendientes /response.length)*100;
      this.ViajesPendientes=resultpend.toFixed(2);
      resultermin=(Terminado / response.length)*100;
      this.viajestermindo = resultermin.toFixed(2);
      this.dataSource = new MatTableDataSource(response);
      this.dataSourceMovil = new MatTableDataSource(response);    
      this.dataSource.paginator = this.paginator;
      this.dataSourceMovil.paginator = this.paginator2;
     })
  }
  
  helpRegistro(){
    let dialogRef = this.dialog.open(PDFComponent, {
      data: { titulo: "Manual de usuario",subtitulo:"Registrar un viaje",pdfSrc:"../../../../../assets/Operaciones/Viajes/Manual de usuario Registro de viaje.pdf"}
    });
  }

  helpEditar(){
    let dialogRef = this.dialog.open(PDFComponent, {
      data: { titulo: "Manual de usuario",subtitulo:"Editar un viaje",pdfSrc:"../../../../../assets/Operaciones/Viajes/Manual de usuario Editar viaje.pdf"}
    });
  }
  
  helpMonitorear(){
    let dialogRef = this.dialog.open(PDFComponent, {
      data: { titulo: "Manual de usuario",subtitulo:"Monitor viaje",pdfSrc:"../../../../../assets/Operaciones/Viajes/Manual de usuario Monitor.pdf"}
    });
  }

  exportMovil() {
    var exels = Date();
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(this.dataSourceMovil.filteredData);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); 
    XLSX.writeFile(workBook, `Reporte de Viaje ${exels}.xlsx`); 
  }
  export() {
    var exels = Date();
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); 
    XLSX.writeFile(workBook, `Reporte de Viaje ${exels}.xlsx`);
  }   

}
