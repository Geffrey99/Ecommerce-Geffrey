import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmacionComponent } from './modal-confirmacion.component';

describe('ModalConfirmacionComponent', () => {
  let component: ModalConfirmacionComponent;
  let fixture: ComponentFixture<ModalConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfirmacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
