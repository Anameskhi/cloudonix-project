import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { authGuard } from './core/guards/auth.guard';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        component: AuthComponent,
        canActivate: [loginGuard]
      },
      {
        path: 'products-list',
        loadComponent: () =>
          import('./pages/products/product-list/product-list.component').then(
            (m) => m.ProductListComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'add-product',
        loadComponent: () =>
          import('./pages/products/create-edit-product/create-edit-product.component').then(
            (m) => m.CreateEditProductComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./pages/products/create-edit-product/create-edit-product.component').then(
            (m) => m.CreateEditProductComponent
          ),
        canActivate: [authGuard],
      },

    ],
  },
  { path: '**', redirectTo: 'auth' },
];
