import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogModule,MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-detalles',
  templateUrl: './usuario-detalles.component.html',
  styleUrls: ['./usuario-detalles.component.css']
})
export class UsuarioDetallesComponent implements OnInit {
  public title: string = "";
  public usuario:any;
  public subtitulo:string="";
  public relcelres: any;
  public relMailres:any;
  constructor( public dialogRef: MatDialogRef<UsuarioDetallesComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
          this.title = this.data.titulo;
          this.usuario =this.data.usuario;
          this.relcelres = data.relcelres;
          this.subtitulo = this.data.subtitulo;
          this.relMailres = data.relMailres;
        }
        onNoClick(): void {
          this.dialogRef.close();
        }
  ngOnInit(): void {
  }

}
