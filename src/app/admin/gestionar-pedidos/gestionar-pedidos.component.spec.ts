import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPedidosComponent } from './gestionar-pedidos.component';

describe('GestionarPedidosComponent', () => {
  let component: GestionarPedidosComponent;
  let fixture: ComponentFixture<GestionarPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarPedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
