import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsusarioRegistroComponent } from './ususario-registro.component';

describe('UsusarioRegistroComponent', () => {
  let component: UsusarioRegistroComponent;
  let fixture: ComponentFixture<UsusarioRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsusarioRegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsusarioRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
