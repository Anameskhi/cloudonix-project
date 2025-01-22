import { RedirectCommand, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

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
          import('./pages/product-list/product-list.component').then(
            (m) => m.ProductListComponent
          ),
      },
      { path: '**', redirectTo: 'auth' },
];
