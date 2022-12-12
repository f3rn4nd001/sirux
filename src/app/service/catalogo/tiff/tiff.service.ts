import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { ErrorComponent } from '../../../Component/Alerts/error/error.component';
import { environment } from "../../../../environments/environment";
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class TiffService {

  constructor(	public dialog: MatDialog,
    public _http:HttpClient) { }
 
    getMunicipiosentidades(data:any){
      let json=JSON.stringify(data);
      var api = `${environment.direcurl}Catalogo/ciudadmunicipios/consulta`;	
         return new Promise( ( resolve, reject ) => { 
        axios.post(api,{datos:JSON.parse(json),haders:"^SL#Hcj[d8kTjwOr4~p4aK7+8x0OlF9GLCvH2c-]~bxLMos"}).then(response => {
          resolve(response.data);        
        }).catch((error) => {
          if(error.response.status==500){
            let dialogRef = this.dialog.open(ErrorComponent, {
              data: { titulo: "Error al conectar con el servidor ", sup: "Revise su coneccion de internet" } 
            });
            }
          });
        });
      }
      getRegistros(data:any){
        let json=JSON.stringify(data);
        var api = `${environment.direcurl}Catalogo/tiff/consulta`;	
           return new Promise( ( resolve, reject ) => { 
          axios.post(api,{datos:JSON.parse(json),haders:"^SL#Hcj[d8kTjwOr4~p4aK7+8x0OlF9GLCvH2c-]~bxLMos"}).then(response => {
            resolve(response.data);        
          }).catch((error) => {
            if(error.response.status==500){
              let dialogRef = this.dialog.open(ErrorComponent, {
                data: { titulo: "Error al conectar con el servidor ", sup: "Revise su coneccion de internet" } 
              });
              }
            });
          });
        }

        postRegistro(data:any){
          let json=JSON.stringify(data);
          var api = `${environment.direcurl}Catalogo/tiff/registro`;	
             return new Promise( ( resolve, reject ) => { 
            axios.post(api,{datos:JSON.parse(json),haders:"^SL#Hcj[d8kTjwOr4~p4aK7+8x0OlF9GLCvH2c-]~bxLMos"}).then(response => {
              resolve(response.data);        
            }).catch((error) => {
              if(error.response.status==500){
                let dialogRef = this.dialog.open(ErrorComponent, {
                  data: { titulo: "Error al conectar con el servidor ", sup: "Revise su coneccion de internet" } 
                });
              }
            });
          });
        }

        getDetalle(Params:any){
          let json=JSON.stringify(Params);
          var api = `${environment.direcurl}Catalogo/tiff/detalles`;	   	
          return new Promise( ( resolve, reject ) => { 
            axios.post(api,{datos:JSON.parse(json),haders:"^SL#Hcj[d8kTjwOr4~p4aK7+8x0OlF9GLCvH2c-]~bxLMos"}).then(response => {
              resolve(response.data);        
            }).catch((error) => {
              if(error.response.status==500){
                let dialogRef = this.dialog.open(ErrorComponent, {
                  data: { titulo: "Error al conectar con el servidor ", sup: "Revise su coneccion de internet" } 
                });
              }
            });
          });
        }  
}
