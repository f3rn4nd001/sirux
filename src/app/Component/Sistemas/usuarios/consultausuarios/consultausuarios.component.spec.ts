import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultausuariosComponent } from './consultausuarios.component';

describe('ConsultausuariosComponent', () => {
  let component: ConsultausuariosComponent;
  let fixture: ComponentFixture<ConsultausuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultausuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultausuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
