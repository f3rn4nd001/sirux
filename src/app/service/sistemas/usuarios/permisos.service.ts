import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import axios from 'axios';
import { environment } from "../../../../environments/environment";
import { ErrorComponent } from '../../../Component/Alerts/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {


  constructor(
    public dialog: MatDialog,
      public _http:HttpClient
    ) { }

    upload(file: File){
    const formData: FormData = new FormData();
		formData.append('file', file);
    let json=JSON.stringify(formData);
    var api = `${environment.direcurl}p1file`;	
		return new Promise( ( resolve, reject ) => { 
				axios.post(api,{datos:json})
				.then(response => {
						  resolve(response.data);        
					  }).catch((error) => {
						if(error.response.status==500){
						console.log(error.response);
							}
					  });
		});
	}
  
  

  getFiles(data:any){
		let json=JSON.stringify(data);
		var api = `${environment.direcurl}getMenu`;	
		return new Promise( ( resolve, reject ) => { 
				axios.post(api,{datos:json})
				.then(response => {
						  resolve(response.data);        
					  }).catch((error) => {
						  reject(error);
					  });
		});
	}

  
	getRegistrosPermisos(Params:any){
	
	let json=JSON.stringify(Params);
	var api = `${environment.direcurl}Sistemas/Usuarios/detallesPermisos`;	
   	return new Promise( ( resolve, reject ) => { 
		axios.post(api,{datos:json ,haders:"^SL#Hcj[d8kTjwOr4~p4aK7+8x0OlF9GLCvH2c-]~bxLMos"}).then(response => {
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
		let json=(data);
		var api = `${environment.direcurl}Sistemas/usuario/postregistro`;	
   		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{json,haders:"^SL#Hcj[d8kTjwOr4~p4aK7+8x0OlF9GLCvH2c-]~bxLMos"}).then(response => {
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