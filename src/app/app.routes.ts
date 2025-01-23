import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'products-list',
        loadComponent: () =>
          import('./pages/products/product-list/product-list.component').then(
            (m) => m.ProductListComponent
          ),
        canActivate: [authGuard],
      },
      { path: '**', redirectTo: 'auth' },
];
