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
export class UsuarioserviceService {

  constructor(
	public dialog: MatDialog,
    public _http:HttpClient
  ) { }

  getRegistro(){
	var api = `${environment.direcurl}Catalogo/usuario/consulta`;	
	return new Promise( ( resolve, reject ) => { 
      	axios.get(api).then(response => {
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
		var api = `${environment.direcurl}Catalogo/usuario/registro`;	
		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:JSON.parse(json)}).then(response => {
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

	getRFC(Params:any){
		let json=JSON.stringify(Params);
		var api = `${environment.direcurl}Catalogo/usuario/getRFC`;	
		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:json}).then(response => {
				resolve(response.data);        
			}).catch((error) => {	
			});
		});
	}
	
	getDetalle(Params:any){
		let json=JSON.stringify(Params);
		var api = `${environment.direcurl}Catalogo/usuario/detalles`;	
		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:json}).then(response => {
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
	
	postEliminar(data:any){
		let json=JSON.stringify(data);
		var api = `${environment.direcurl}Catalogo/usuario/delete`;		
		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:JSON.parse(json)}).then(response => {
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
	
	getMenuSubmenus(){
		var api = `${environment.direcurl}Sistemas/uausrios/asignaciones`;	
		return new Promise( ( resolve, reject ) => { 
			axios.get(api).then(response => {
				resolve(response.data);        
			}).catch((error) => {
				reject(error);
			});
		});
	}
}
