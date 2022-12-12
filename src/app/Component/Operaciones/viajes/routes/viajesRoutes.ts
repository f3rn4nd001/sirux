import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

//import components
import { NuevoViajeComponent } from "../nuevo-viaje/nuevo-viaje.component";
import { MonitoreoviajeComponent } from "../monitoreoviaje/monitoreoviaje.component";
import { DocumentsComponent } from "../../viajes/documents/documents.component";
//defin rutas
    const monitoreoviajerouting:ModuleWithProviders<any>=RouterModule.forRoot([
        {path:'Operaciones/viaje/monitoreoViajes',component:MonitoreoviajeComponent}
    ]);
    const viajerouting:ModuleWithProviders<any>=RouterModule.forRoot([
        {path:'Operaciones/viaje/nuevoViaje',component:NuevoViajeComponent}
    ]);
    const Documentsrouting:ModuleWithProviders<any>=RouterModule.forRoot([
        {path:'Operaciones/viaje/DocumentsViajes',component:DocumentsComponent}
    ]);
export var objRutasOpercionesViajes=[ 
    viajerouting,monitoreoviajerouting,Documentsrouting
];