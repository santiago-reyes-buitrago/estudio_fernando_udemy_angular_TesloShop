import {Routes} from '@angular/router';
import {AdminDashboardLayout} from '@admin/layout/admin-dashboard-layout/admin-dashboard-layout';
import {ProductsAdminPage} from '@admin/pages/products-admin-page/products-admin-page';
import {ProductAdminPage} from '@admin/pages/product-admin-page/product-admin-page';
import {isAdminGuard} from '@auth/guards/is-admin-guard';

 const adminDashboardRoutes: Routes = [
  {
    path: '', component: AdminDashboardLayout,
    children: [
      {path: 'products', component: ProductsAdminPage},
      {path: 'products/:id', component: ProductAdminPage},
      {path: '**', redirectTo: 'products'},
    ]
  }
]

export default adminDashboardRoutes;
