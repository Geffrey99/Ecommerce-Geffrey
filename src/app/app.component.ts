import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

import { ProductComponent } from './features/product/product.component';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/auth/login.service';
import { ProductService } from './services/features/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, ProductComponent],
  providers: [LoginService, ProductService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebGeffrey';
}
