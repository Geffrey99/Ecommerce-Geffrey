//-admin.component.ts
import { Component} from '@angular/core';
import { HeaderAdminComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterModule } from '@angular/router';
import { ProductComponent } from '../features/product/product.component';
import { filter } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderAdminComponent, CommonModule, RouterModule,  ProductComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  showProductComponent = true;

  constructor(private router: Router) {
    // Escucha los eventos de cambio de ruta
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Oculta el componente `app-product` si la ruta es diferente de la inicial
      this.showProductComponent = event.urlAfterRedirects === '/admin';
    });
  }
}
