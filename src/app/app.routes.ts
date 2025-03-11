import {Routes} from '@angular/router';

import {LayoutComponent} from './cliente/layout/layout.component';
import {LayoutBackComponent} from './backoffice/layout/layout.component';

import {HomeComponent} from './cliente/home/home.component';
import {LoginComponent} from './cliente/login/login.component';
import {RegistroComponent} from './cliente/registro/registro.component';
import {TiendaComponent} from './cliente/tienda/tienda.component';
import {ControlPanelComponent} from './backoffice/control-panel/control-panel.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {authGuard} from './services/guards/auth.guard';
import {publicGuard} from './services/guards/public.guard';

export const routes: Routes = [

  // cliente
  // localhost:4200 -> www.ejemplo.com
  {
    path: "", component: LayoutComponent, children: [ // -> www.ejemplo.com
      {path: "", component: HomeComponent}, // -> www.ejemplo.com
      {path: "login", component: LoginComponent, canActivate: [publicGuard]}, // -> www.ejemplo.com/login
      {path: "registro", component: RegistroComponent, canActivate: [publicGuard]}, // -> www.ejemplo.com/registro
      {path: "tienda", component: TiendaComponent}, // www.ejemplo.com/tienda
    ]
  },
  // backoffice
  // www.ejemplo.com/app
  {
    path: "app", canActivate:[authGuard], component: LayoutBackComponent, children: [ // -> www.ejemplo.com/app
      // www.ejemplo.com/app -> no hay parámetros después del app, por lo tanto, angular buscar dentro de esta sección de children el path que esté vacío ""

      {path: "", redirectTo: "control-panel", pathMatch: "full"}, // -> www.ejemplo.com/app
      {path: "control-panel", component: ControlPanelComponent}, // -> www.ejemplo.com/app/control-panel
    ]
  },

  // Si el usuario introduce una url que no existe en la parte superior
  {path: "**", component: PageNotFoundComponent},
];
















