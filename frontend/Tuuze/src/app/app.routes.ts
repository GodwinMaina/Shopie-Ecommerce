import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminCreateProductsComponent } from './components/admin-create-products/admin-create-products.component';
import { AdminUpdateProductsComponent } from './components/admin-update-products/admin-update-products.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdminViewUsersComponent } from './components/admin-view-users/admin-view-users.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/create-products', component: AdminCreateProductsComponent },
  { path: 'admin/update-products/:product_id', component: AdminUpdateProductsComponent },
  { path: 'admin/view-users', component: AdminViewUsersComponent },
  { path: 'settings', component: ChangePasswordComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'users', component: UserDashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:product_id', component: ProductModalComponent },
  { path: '**', component: NotFoundComponent },
];
