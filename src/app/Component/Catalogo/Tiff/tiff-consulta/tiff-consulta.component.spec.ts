import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiffConsultaComponent } from './tiff-consulta.component';

describe('TiffConsultaComponent', () => {
  let component: TiffConsultaComponent;
  let fixture: ComponentFixture<TiffConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiffConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiffConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
