import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import axios from 'axios';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { ErrorComponent } from '../../Component/Alerts/error/error.component';
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(	
	public dialog: MatDialog,
    public _http:HttpClient
  ) { }

  getRegistro(data:any){
	let json=JSON.stringify(data);
	var api = `${environment.direcurl}Operaciones/viaje/consulta`;	
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
	
	getDatosMonitor(Params:any){
		let json=JSON.stringify(Params);
		var api = `${environment.direcurl}Operaciones/viaje/Monitoreo/getDatosMonitor`;	   	
		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:json,haders:"^SL#Hcj[d8kTjwOr4~p4aK7+8x0OlF9GLCvH2c-]~bxLMos"}).then(response => {
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
		var api = `${environment.direcurl}Operaciones/viaje/detalles`;	   	
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
	
	getComplementosTiff(data:string){
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
	getComplementos(){
		var api = `${environment.direcurl}Operaciones/viaje/registro/compremento`;	
   		return new Promise( ( resolve, reject ) => { 
			axios.get(api).then(response => {
				resolve(response.data);        
			}).catch((error) => {
				reject(error);
			});
		});
	}

	postMonitoreoMasivo(data:any){
		let json=JSON.stringify(data);
		var api = `${environment.direcurl}Operaciones/viaje/Monitoreo/postMonitoreoMasivo`;	
   		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:JSON.parse(json),haders:"^SL#Hcj[d8kTjwOr4~p4aK7+8x0OlF9GLCvH2c-]~bxLMos"}).then(response => {
				resolve(response.data);        
			}).catch((error) => {
				reject(error);
			});
		});
	}

	postMonitoreo(data:any){
		let json=JSON.stringify(data);
		var api = `${environment.direcurl}Operaciones/viaje/Monitoreo/Mensaje`;	
   		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:JSON.parse(json),haders:"^SL#Hcj[d8kTjwOr4~p4aK7+8x0OlF9GLCvH2c-]~bxLMos"}).then(response => {
				resolve(response.data);        
			}).catch((error) => {
				reject(error);
			});
		});
	}

	postRegistro(data:any){
		let json=JSON.stringify(data);
		var api = `${environment.direcurl}Operaciones/viaje/registro`;	
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
