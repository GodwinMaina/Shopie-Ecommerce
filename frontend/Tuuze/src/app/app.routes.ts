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
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/create-products', component: AdminCreateProductsComponent, canActivate: [authGuard]  },
  { path: 'admin/update-products/:product_id', component: AdminUpdateProductsComponent, canActivate: [authGuard]  },
  { path: 'admin/view-users', component: AdminViewUsersComponent, canActivate: [authGuard]  },
  { path: 'admin/settings', component: ChangePasswordComponent, canActivate: [authGuard]  },
  { path: 'users/settings', component: ChangePasswordComponent,canActivate: [authGuard]  },
  { path: 'settings', component: ChangePasswordComponent,canActivate: [authGuard]  },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'users', component: UserDashboardComponent, canActivate: [authGuard]  },
  { path: 'cart', component: CartComponent, canActivate: [authGuard]  },
  { path: 'product/:product_id', component: ProductModalComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent },
];
