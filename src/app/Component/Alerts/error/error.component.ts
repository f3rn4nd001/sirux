import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogModule,MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public title: string = "";
  public listadodata:any;
  public subtitulo:string="";
  constructor(
    public dialogRef: MatDialogRef<ErrorComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.title = this.data.titulo;
      this.listadodata =this.data.listado;
      this.subtitulo = this.data.sup
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  ngOnInit(): void {
  
  }


}
