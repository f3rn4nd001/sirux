import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadEntidadConsultaComponent } from './ciudad-entidad-consulta.component';

describe('CiudadEntidadConsultaComponent', () => {
  let component: CiudadEntidadConsultaComponent;
  let fixture: ComponentFixture<CiudadEntidadConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiudadEntidadConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiudadEntidadConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
