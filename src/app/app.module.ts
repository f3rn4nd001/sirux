import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { objRutasOpercionesViajes } from "./Component/Operaciones/viajes/routes/viajesRoutes";
import { objRutasCatalogosUsurios } from "./Component/Catalogo/usuario/routes/catalogoUsuarioRoutes";
import { objRutasCatalogosTiff } from "./Component/Catalogo/Tiff/routes/catalogoTiffRoutes";
import { objRutasMenuRutas } from "./menuRouters";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { AppComponent } from './app.component';
import { NuevoViajeComponent } from './Component/Operaciones/viajes/nuevo-viaje/nuevo-viaje.component';
import { DetalleViajeComponent } from './Component/Operaciones/viajes/detalle-viaje/detalle-viaje.component';
import { ConsultaViajeComponent } from './Component/Operaciones/viajes/consulta-viaje/consulta-viaje.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from "@angular/common/http";
import { MonitoreoviajeComponent } from './Component/Operaciones/viajes/monitoreoviaje/monitoreoviaje.component';
import { UsuarioConsultaComponent } from './Component/Catalogo/usuario/usuario-consulta/usuario-consulta.component';
import { UsusarioRegistroComponent } from './Component/Catalogo/usuario/ususario-registro/ususario-registro.component';
import { UsuarioDetallesComponent } from './Component/Catalogo/usuario/usuario-detalles/usuario-detalles.component';
import { ErrorComponent } from './Component/Alerts/error/error.component';
import { GuardarComponent } from './Component/Alerts/guardar/guardar.component';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { ConsultausuariosComponent } from './Component/Sistemas/usuarios/consultausuarios/consultausuarios.component';
import { AsignacionPermisosComponent } from './Component/Sistemas/usuarios/asignacion-permisos/asignacion-permisos.component';
import { objRutasSystemas } from './Component/Sistemas/usuarios/routes/sistemasRoutes';
import { FileUploadModule } from 'ng2-file-upload';
import { ConsultaComponent } from './Component/Catalogo/MenuSubMenuPermisos/Consulta/consulta.component';
import { objRutasCatalogosMenuSubmenu } from './Component/Catalogo/MenuSubMenuPermisos/routes/catalogoMenuSubmenusPermisosRoutes';
import { UsuarioEliminarComponent } from './Component/Catalogo/usuario/usuario-eliminar/usuario-eliminar.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PDFComponent } from './Component/Alerts/pdf/pdf.component';
import {BnNgIdleService   } from "bn-ng-idle";
import { HomeComponent } from './Component/Home/home/home.component';
import { CiudadEntidadConsultaComponent } from './Component/Catalogo/CiudadEntidad/ciudad-entidad-consulta/ciudad-entidad-consulta.component';
import { TiffConsultaComponent } from './Component/Catalogo/Tiff/tiff-consulta/tiff-consulta.component';
import { TiffRegistroComponent } from './Component/Catalogo/Tiff/tiff-registro/tiff-registro.component';
import { DocumentsComponent } from './Component/Operaciones/viajes/documents/documents.component';
import { TransportesComponent } from './Component/Catalogo/transportes/transportes.component';
@NgModule({
  declarations: [
    AppComponent,
    NuevoViajeComponent,
    DetalleViajeComponent,
    ConsultaViajeComponent,
    MonitoreoviajeComponent,
    UsuarioConsultaComponent,
    UsusarioRegistroComponent,
    UsuarioDetallesComponent,
    ErrorComponent,
    GuardarComponent,
    ConsultausuariosComponent,
    AsignacionPermisosComponent,
    ConsultaComponent,
    UsuarioEliminarComponent,
    PDFComponent,
    HomeComponent,
    CiudadEntidadConsultaComponent,
    TiffConsultaComponent,
    TiffRegistroComponent,
    DocumentsComponent,
    TransportesComponent,
   ],
  imports: [
    BrowserModule,
    objRutasCatalogosMenuSubmenu,
    objRutasOpercionesViajes,
    objRutasCatalogosUsurios,
    objRutasMenuRutas,
    objRutasSystemas,
    objRutasCatalogosTiff,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatDialogModule,
    HttpClientModule,
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    FileUploadModule,
    PdfViewerModule,
    
  ],
  providers: [BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
