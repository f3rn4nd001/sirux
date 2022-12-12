import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaViajeComponent } from './consulta-viaje.component';

describe('ConsultaViajeComponent', () => {
  let component: ConsultaViajeComponent;
  let fixture: ComponentFixture<ConsultaViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaViajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
