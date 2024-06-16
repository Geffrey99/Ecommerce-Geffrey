
import { Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';

import { AuthGuard } from './services/guards/auth.guard' 
import { adminRoutes } from './admin/admin.routes';
import { clientRoutes } from './client/client.routes';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'app-user', component: ClientComponent, canActivate: [AuthGuard], children: clientRoutes },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: adminRoutes },

  
];
     
//El home component redirige a la vista de login ---> Y a su vez admin o client redirigen a sus respectivas vistas
