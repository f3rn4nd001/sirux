import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

//import components
import { UsusarioRegistroComponent } from "../ususario-registro/ususario-registro.component";
import { UsuarioEliminarComponent } from "../usuario-eliminar/usuario-eliminar.component";
//defin rutas

 const monitoreocatUsuaiorouting:ModuleWithProviders<any>=RouterModule.forRoot([
    {path:'Consulta/Usuario/Registrar',component:UsusarioRegistroComponent},
    {path:'Consulta/Usuario/Eliminar',component:UsuarioEliminarComponent}
]);

export var objRutasCatalogosUsurios=  [ 
    monitoreocatUsuaiorouting
];