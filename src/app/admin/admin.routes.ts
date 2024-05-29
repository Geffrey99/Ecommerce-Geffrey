// admin.routes.ts
import { Routes } from '@angular/router';
import { CrudClientesComponent } from './crud-clientes/crud-clientes.component';
import { CrudProductosComponent } from './crud-productos/crud-productos.component';
import { GestionarPedidosComponent } from './gestionar-pedidos/gestionar-pedidos.component';
import { DetailComponent } from '../features/detail/detail.component'; // 
import { ProductComponent } from '../features/product/product.component';


export const adminRoutes: Routes = [
  { path: 'clientes', component: CrudClientesComponent },
  { path: 'productos', component: CrudProductosComponent },
  { path: 'pedidos', component: GestionarPedidosComponent },
  { path: 'products', component: ProductComponent },
  { path: '', redirectTo: 'admin', pathMatch: 'full'}
];
