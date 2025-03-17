import { Routes } from '@angular/router';

import { LayoutComponent } from './cliente/layout/layout.component';
import { LayoutBackComponent } from './backoffice/layout/layout.component';

import { HomeComponent } from './cliente/home/home.component';
import { LoginComponent } from './cliente/login/login.component';
import { RegistroComponent } from './cliente/registro/registro.component';
import { TiendaComponent } from './cliente/tienda/tienda.component';
import { ControlPanelComponent } from './backoffice/control-panel/control-panel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './services/guards/auth.guard';
import { publicGuard } from './services/guards/public.guard';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { AddProductoComponent } from './backoffice/add-producto/add-producto.component';
import { AddProductModalComponent } from './backoffice/add-product-modal/add-product-modal.component';
import { VerProductosComponent } from './cliente/ver-productos/ver-productos.component';
import { CartComponent } from './cliente/cart/cart.component';
import { CartService } from './services/cart.service';
import { FormaPagoComponent } from './cliente/forma-pago/forma-pago.component';
import { RoleGuard } from './services/guards/role.guard';


export const routes: Routes = [

  // cliente
  // localhost:4200 -> www.ejemplo.com
  {
    path: "", component: LayoutComponent, children: [ // -> www.ejemplo.com
      { path: "", component: HomeComponent }, // -> www.ejemplo.com
      // { path: "", component: HomeComponent, canActivate: [publicGuard]  }, // -> www.ejemplo.com
      { path: "login", component: LoginComponent, canActivate: [publicGuard] }, // -> www.ejemplo.com/login
      // { path: "login", component: LoginComponent }, // -> www.ejemplo.com/login
      { path: "registro", component: RegistroComponent, canActivate: [publicGuard] }, // -> www.ejemplo.com/registro
      // { path: "registro", component: RegistroComponent }, // -> www.ejemplo.com/registro
    ]
  },

  // backoffice // admin
  // www.ejemplo.com/app
  // {
  //   path: "app", canActivate: [authGuard], component: LayoutBackComponent, children: [ // -> www.ejemplo.com/app
  //     // www.ejemplo.com/app -> no hay parámetros después del app, por lo tanto, angular buscar dentro de esta sección de children el path que esté vacío ""
  //     { path: "", redirectTo: "control-panel", pathMatch: "full" }, // -> www.ejemplo.com/app
  //     { path: "control-panel", component: ControlPanelComponent }, // -> www.ejemplo.com/app/control-panel
  //     { path: 'user-profile', component: UserProfileComponent },
  //     { path: "change-password", component: ChangePasswordComponent },
  //     { path: "add-producto", component: AddProductoComponent },
  //     { path: "tienda", component: TiendaComponent },
  //     { path: 'ver-productos/:id', component: VerProductosComponent },
  //     { path: "cart", component: CartComponent},
  //     { path: "forma-pago", component: FormaPagoComponent},
  //   ]
  // },
    // Client routes
    {
      path: "client",
      canActivate: [authGuard, RoleGuard],
      component: LayoutBackComponent,
      data: { role: "CLIENT" }, // Add role-specific data
      children: [
        { path: "", component: TiendaComponent, pathMatch:"full" }, // Client-specific homepage
        { path: "tienda", component: TiendaComponent },
        { path: "ver-productos/:id", component: VerProductosComponent },
        { path: "cart", component: CartComponent },
        { path: "forma-pago", component: FormaPagoComponent },
        { path: 'user-profile', component: UserProfileComponent },
        { path: "change-password", component: ChangePasswordComponent },

      ],
    },
  
    // Admin routes
    {
      path: "admin",
      canActivate: [authGuard, RoleGuard],
      component: LayoutBackComponent,
      data: { role: "ADMIN" }, // Add role-specific data
      children: [
        { path: "", component: ControlPanelComponent, pathMatch:"full" }, // Admin-specific homepage
        { path: "control-panel", component: ControlPanelComponent },
        { path: "tienda", component: TiendaComponent },
        { path: "ver-productos/:id", component: VerProductosComponent },
        { path: "cart", component: CartComponent },
        { path: "forma-pago", component: FormaPagoComponent},
        { path: "add-producto", component: AddProductoComponent },
        { path: 'user-profile', component: UserProfileComponent },
        { path: "change-password", component: ChangePasswordComponent },
      ],
  },
       // Admin routes
       {
        path: "seller",
        canActivate: [authGuard, RoleGuard],
        component: LayoutBackComponent,
        data: { role: "SELLER" }, // Add role-specific data
        children: [
          { path: "", component: AddProductoComponent, pathMatch:"full" }, // Seller-specific homepage
          { path: "control-panel", component: ControlPanelComponent },
          { path: "add-producto", component: AddProductoComponent },
          { path: 'user-profile', component: UserProfileComponent },
          { path: "change-password", component: ChangePasswordComponent },
        ],
      },
  // Si el usuario introduce una url que no existe en la parte superior
  {path: "**", component: PageNotFoundComponent},
];
