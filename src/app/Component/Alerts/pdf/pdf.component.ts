import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogModule,MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PDFComponent implements OnInit {
  public title: string = "";
  public listadodata:any;
  public subtitulo:string="";
  public pdfSrc: string = "";
    
 
  constructor( public dialogRef: MatDialogRef<PDFComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.title = this.data.titulo;
      this.listadodata =this.data.listado;
      this.subtitulo = this.data.subtitulo;
      this.pdfSrc= this.data.pdfSrc;
    }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
