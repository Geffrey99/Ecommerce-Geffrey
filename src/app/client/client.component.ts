import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HeaderClienteComponent } from './header-cliente/header-cliente.component';
import { filter } from 'rxjs';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, HeaderClienteComponent, ProductComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  showProductComponent = true;

  constructor(private router: Router) {
    // Escucha los eventos de cambio de ruta
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Oculta el componente `app-product` si la ruta es diferente de la inicial
      this.showProductComponent = event.urlAfterRedirects === '/app-user';
    });
  }
}
