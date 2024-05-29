
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './features/product/product.component';
import { DetailComponent } from './features/detail/detail.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './features/cart/cart.component';

import { AuthGuard } from './services/guards/auth.guard' // Ajusta la ruta según la ubicación de tu guard
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'app-user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'app-products', component: ProductComponent },
  { path: 'product/:id', component: DetailComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: adminRoutes },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
];
