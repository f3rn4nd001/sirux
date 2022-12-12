import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';
import { LoginService } from "./service/Login/login.service";
import {BnNgIdleService} from "bn-ng-idle";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  public loginEcodUsuarios : any = '';
  public res : any={};
  public FormLogin: any = FormGroup;
  public menu :any = [];
  public menusub :any = [];
  public submenus :any = [];
  public nombreuser:any={};
  public topouser:any={};
  public CurremDate:any={};
  constructor(
    public router: Router,
    private _service:LoginService,
    private bnIdle: BnNgIdleService
  ) {}

  ngOnInit(): void {
    let res = {};
    this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
      if (res) {
        localStorage.removeItem('loginEcodUsuarios');
        localStorage.removeItem('submenus');
        window.location.reload();  
      }});

    this.FormLogin = new FormGroup({
      'Email': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required])
    });
    this.loginEcodUsuarios = localStorage.getItem('loginEcodUsuarios');
    if (!this.loginEcodUsuarios) {this.router.navigate(['/']);}
    if (this.loginEcodUsuarios) {this.getMenu();}
    
  }
  getMenu(){
    this.nombreuser = localStorage.getItem('Usuario');
    this.topouser = localStorage.getItem('tipousuario');
    this.CurremDate = new Date();
    let data = this.loginEcodUsuarios;
    const map = new Map();
    let datosmenu :any = [];
    this._service.getMenu(data).then((response:any)=>{
      response.arrselecmenu.forEach((element:any) => {  
        if(!map.has(element.submenu )){ 
          map.set(element.submenu, true);    // set any value to Map
          this.menusub.push({
            submenu:element.submenu, 
            Menu:element.Menu,
            url:element.url
          });
        }
        if(!map.has(element.Menu)){ 
          map.set(element.Menu, true);    // set any value to Map
          this.menu.push({
            Menu:element.Menu, 
          });
        }
        this.submenus.push({
          submenu:element.submenu, 
          url:element.url, 
          Menu:element.Menu,
          permisosNCorto:element.permisosNCorto,
          controller:element.controller
        });
      });
      localStorage.setItem('submenus', JSON.stringify(this.submenus)); 
    });
  }

  Login(){
    let data = this.FormLogin.value; 
    this._service.poslogin(data).then((response:any)=>{
      this.res = (response.sql); 
      this.res.forEach((element:any) => {
        if (element.ecodUsuarios) {
          localStorage.setItem('loginEcodUsuarios', element.ecodUsuarios);
          localStorage.setItem('Usuario', element.usuario);
          localStorage.setItem('tipousuario', element.tipousuario); 
          window.location.reload();
        }
        else{
          localStorage.removeItem('loginEcodUsuarios');
          window.location.reload();
        }
      });
    }); 
  }

  salir(){
    localStorage.removeItem('loginEcodUsuarios');
    localStorage.removeItem('submenus');
    localStorage.removeItem('Usuario');
    localStorage.removeItem('tipousuario');
    window.location.reload();  
  }
  

}
