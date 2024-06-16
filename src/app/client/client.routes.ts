// client.routes.ts

import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { DetallesComprasComponent } from './detalles-compras/detalles-compras.component';
import { DetailComponent } from '../client/details-products/detail.component'; 
import { ProductComponent } from '../client/product/product.component';
import {CategoriasComponent} from './categorias/categorias.component';
import { EditarDatosComponent } from './editar-datos/editar-datos.component';



export const clientRoutes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'product/:id', component: DetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'mis-pedidos', component: DetallesComprasComponent },
  {path: 'editar-datos/:id', component: EditarDatosComponent},
  { path: 'category/:name', component:CategoriasComponent },
  { path: 'cliente', redirectTo: 'client', pathMatch: 'full'},
];
