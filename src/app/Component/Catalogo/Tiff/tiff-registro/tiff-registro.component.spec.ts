import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiffRegistroComponent } from './tiff-registro.component';

describe('TiffRegistroComponent', () => {
  let component: TiffRegistroComponent;
  let fixture: ComponentFixture<TiffRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiffRegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiffRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
