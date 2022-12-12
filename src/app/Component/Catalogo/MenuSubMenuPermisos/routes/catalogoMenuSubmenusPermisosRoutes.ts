import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

//import components
import { AgregarComponent } from "..//agregar/agregar.component";
//defin rutas

 const MenuSubmenucatMenuSubmenurouting:ModuleWithProviders<any>=RouterModule.forRoot([
    {path:'Catalogo/MenuSubmenu/Registrar',component:AgregarComponent}
]);

export var objRutasCatalogosMenuSubmenu=  [ 
    MenuSubmenucatMenuSubmenurouting
];