import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

//import components

import { ConsultaViajeComponent } from "./Component/Operaciones/viajes/consulta-viaje/consulta-viaje.component";
import { UsuarioConsultaComponent } from "./Component/Catalogo/usuario/usuario-consulta/usuario-consulta.component";
import { ConsultausuariosComponent } from "./Component/Sistemas/usuarios/consultausuarios/consultausuarios.component";
import { ConsultaComponent } from "./Component/Catalogo/MenuSubMenuPermisos/Consulta/consulta.component";
import { HomeComponent } from "./Component/Home/home/home.component";
import { CiudadEntidadConsultaComponent } from "./Component/Catalogo/CiudadEntidad/ciudad-entidad-consulta/ciudad-entidad-consulta.component";
import { TiffConsultaComponent } from "./Component/Catalogo/Tiff/tiff-consulta/tiff-consulta.component";
import { TransportesComponent } from "./Component/Catalogo/transportes/transportes.component";
//defin rutas


const menurouting:ModuleWithProviders<any>=RouterModule.forRoot(
    [
        {path:'Operaciones/viaje/consulta',component:ConsultaViajeComponent},
        {path:'Catalogo/usuarios/Consulta',component:UsuarioConsultaComponent},
        {path:'Sistemas/usuarios/Consulta',component:ConsultausuariosComponent},
        {path:'Catalogo/MenuSubmenu/Consulta',component:ConsultaComponent},
        {path: 'Home', component:HomeComponent},
        {path:'Catalogo/CiudadesEntidades/Consulta',component:CiudadEntidadConsultaComponent},
        {path: 'Catalogo/TIFF/Consulta',component:TiffConsultaComponent},
        {path: 'Catalogo/Trnsportes/Consulta', component:TransportesComponent},
    ]
);
export var objRutasMenuRutas=[
    menurouting
];