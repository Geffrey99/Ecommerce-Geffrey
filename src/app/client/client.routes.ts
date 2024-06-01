// client.routes.ts
import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { DetailComponent } from '../client/details-products/detail.component'; // 
import { ProductComponent } from '../client/product/product.component';


export const clientRoutes: Routes = [

  { path: 'products', component: ProductComponent },
  { path: 'cliente', redirectTo: 'admin', pathMatch: 'full'}
];
