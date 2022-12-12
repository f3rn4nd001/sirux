import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoreoviajeComponent } from './monitoreoviaje.component';

describe('MonitoreoviajeComponent', () => {
  let component: MonitoreoviajeComponent;
  let fixture: ComponentFixture<MonitoreoviajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoreoviajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoreoviajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
