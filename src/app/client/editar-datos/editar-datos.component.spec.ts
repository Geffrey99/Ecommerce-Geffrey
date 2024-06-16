import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDatosComponent } from './editar-datos.component';

describe('EditarDatosComponent', () => {
  let component: EditarDatosComponent;
  let fixture: ComponentFixture<EditarDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
