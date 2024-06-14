import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosClienteComponent } from './datos-cliente.component';

describe('DatosClienteComponent', () => {
  let component: DatosClienteComponent;
  let fixture: ComponentFixture<DatosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
