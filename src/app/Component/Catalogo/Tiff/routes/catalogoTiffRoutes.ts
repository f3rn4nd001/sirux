import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

//import components
import { TiffRegistroComponent } from "../tiff-registro/tiff-registro.component";
//defin rutas

 const RouterscatUsuaiorouting:ModuleWithProviders<any>=RouterModule.forRoot([
    {path:'Catalogo/TIFF/Registro',component:TiffRegistroComponent},
]);

export var objRutasCatalogosTiff=  [ 
    RouterscatUsuaiorouting
];