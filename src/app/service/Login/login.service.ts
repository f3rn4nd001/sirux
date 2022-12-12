import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { ErrorComponent } from '../../Component/Alerts/error/error.component';
import axios from 'axios';
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  	constructor(
		public dialog: MatDialog,
		public _http:HttpClient
  	) { }

  	getContra(data:any){
		let json=JSON.stringify(data);
		var api = `${environment.direcurl}contras`;	
		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:JSON.parse(json),haders:"Ox_mSak@t~r}uh_GoerfQly_=EM$4iIYk#v4oFguL)TY2b0~O["}).then(response => {
				resolve(response.data);        
			}).catch((error) => {
			});
		});
	}

  	poslogin(data:any){
		let json=JSON.stringify(data);
		var api = `${environment.direcurl}Login`;	
		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:JSON.parse(json),haders:"Ox_mSak@t~r}uh_GoerfQly_=EM$4iIYk#v4oFguL)TY2b0~O["})
			.then(response => {
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

	getMenu(data:any){
		let json=JSON.stringify(data);
		var api = `${environment.direcurl}getMenu`;	
		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:json,haders:"Ox_mSak@t~r}uh_GoerfQly_=EM$4iIYk#v4oFguL)TY2b0~O["})
			.then(response => {
				resolve(response.data);        
			}).catch((error) => {
				reject(error);
			});
		});
	}
}
