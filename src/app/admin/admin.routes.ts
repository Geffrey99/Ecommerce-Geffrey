// admin.routes.ts rutas privadas del administrador
import { Routes } from '@angular/router';
import { CrudClientesComponent } from './crud-clientes/crud-clientes.component';
import { CrudProductosComponent } from './crud-productos/crud-productos.component';
import { GestionarPedidosComponent } from './gestionar-pedidos/gestionar-pedidos.component';
import { DetailComponent } from '../client/details-products/detail.component'; // 
import { ProductComponent } from '../client/product/product.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { DatosClienteComponent } from './datos-cliente/datos-cliente.component';


export const adminRoutes: Routes = [
  { path: 'clientes', component: CrudClientesComponent },
  { path: 'productos', component: CrudProductosComponent },
  { path: 'pedidos', component: GestionarPedidosComponent },
  { path: 'products', component: ProductComponent },
  { path: 'listaProductos', component: ListarProductosComponent },
  {path: 'editar-producto/:id', component: EditarProductosComponent},
  {path: 'datos-cliente/:id', component: DatosClienteComponent},
  // { path: 'admin', redirectTo: 'admin', pathMatch: 'full'}
  { path: 'admin', redirectTo: 'listaProductos', pathMatch: 'full' }

];


