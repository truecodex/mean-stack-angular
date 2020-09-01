import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

export const BACKEND_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'product',
        loadChildren: () => import('../product/product.module').then(m => m.ProductModule),
        canLoad: [AuthGuard]
    }
]