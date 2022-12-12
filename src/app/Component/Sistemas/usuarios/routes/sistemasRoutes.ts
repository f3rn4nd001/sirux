import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

//import components
import { AsignacionPermisosComponent } from "../asignacion-permisos/asignacion-permisos.component";
//defin rutas
    const AsignacionPermisosrouting:ModuleWithProviders<any>=RouterModule.forRoot([
        {path:'Sistemas/usuarios/AsignacionPermisos',component:AsignacionPermisosComponent}
    ]);
   

export var objRutasSystemas=  [ 
    AsignacionPermisosrouting
];