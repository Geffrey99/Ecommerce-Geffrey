
import { Routes} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './client/product/product.component';
import { DetailComponent } from './client/details-products/detail.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './client/cart/cart.component';

import { AuthGuard } from './services/guards/auth.guard' // Ajusta la ruta según la ubicación de tu guard
import { adminRoutes } from './admin/admin.routes';
import { clientRoutes } from './client/client.routes';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'app-products', component: ProductComponent },
  { path: 'product/:id', component: DetailComponent },
  { path: 'app-user', component: ClientComponent, canActivate: [AuthGuard], children: clientRoutes },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: adminRoutes },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
];
     