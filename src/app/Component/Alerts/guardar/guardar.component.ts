import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogModule,MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-guardar',
  templateUrl: './guardar.component.html',
  styleUrls: ['./guardar.component.css']
})
export class GuardarComponent implements OnInit {

  public title: string = "";
  public listadodata:any;
  public subtitulo:string="";
  constructor(
    public dialogRef: MatDialogRef<GuardarComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.title = this.data.titulo;
      this.listadodata =this.data.listado;
      this.subtitulo = this.data.subtitulo
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  ngOnInit(): void {
  
  }


}
