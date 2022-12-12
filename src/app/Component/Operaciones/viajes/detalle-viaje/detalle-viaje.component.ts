import { Component, OnInit,Inject,ViewChild,AfterViewInit } from '@angular/core';
import {MatDialogModule,MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.component.html',
  styleUrls: ['./detalle-viaje.component.css']
})
export class DetalleViajeComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  columnsToDisplayMovil= ['E'];
  public title: string = "";
  public mensjerisqls: any;
  public incidenciasArr :any;
  public dtas: any;
  datatabla: any = [];
  dataincidentes: any = [];
  columnsToDisplay = ['Estatus','treferencia','tpedido','cliente','operador','tOrigen','tDestino','fhLlegada','fhSalida','ecodProvedor','fhEdicion','tmonitoreo','useredit','tIncidentes','tTipoGasto','tTipoViaje','Link'];
  columnsToDisplaymens=['tMensaje','fechaHora'];
  constructor(
    public dialogRef: MatDialogRef<DetalleViajeComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
          this.title = this.data.titulo;
          this.mensjerisqls = data.mensjerisql;
          this.incidenciasArr = data.incidenciasArrs;
          this.dtas = data.viajes[0];
          this.datatabla = new MatTableDataSource(this.mensjerisqls);
          this.datatabla.paginator = this.paginator;
          this.dataincidentes = new MatTableDataSource(this.incidenciasArr);
          this.dataincidentes.paginator2 = this.paginator2;
          this.dataincidentes.sort = this.sort;

        }
  ngOnInit(): void {
  }

}
