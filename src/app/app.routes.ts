
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './features/product/product.component';
import { DetailComponent } from './features/detail/detail.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './features/cart/cart.component';
export const routes: Routes = [
    {path: '', component: HomeComponent , pathMatch: 'full'},
    // { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirecciona a la página de inicio por defecto
     { path: 'iniciar-sesion', component: LoginComponent},
     { path: 'app-user', component: UserComponent},
     { path: 'app-products', component: ProductComponent},
     {path: 'product/:id', component: DetailComponent},
     { path: 'admin', component: AdminComponent},
     { path: 'cart', component: CartComponent },

];
