import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserIdService } from '../../services/user-id.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [LandingPageComponent, CommonModule, NavbarComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartProducts = this.cartImplement.getItems();

  cartProd: any[] = [];
  user_id!: string;
  email!: string;

  constructor(
    private cartImplement: CartService,
    private api: AuthServiceService,
    private user: UserIdService
  ) 
  {
    this.fetchUserCartProducts();
  }

  remove(product_id: string) {
    this.cartImplement.removeFromCart(product_id);
  }

  plusCart() {}

  minusCart() {}

  fetchUserCartProducts(): void {
    this.user_id = this.user.getUserId() || '';
    this.api.getUserCart(this.user_id).subscribe((response) => {
      console.log(response);

      this.cartProd = response.message;

      this.email = this.user.getEmail() || '';
    });

    console.log('cartpage');
  }
  // showProductNav() {
  //   let modalBg = document.querySelector(
  //     '.prod-modal-bg-nav'
  //   ) as HTMLDivElement;

  //   modalBg?.classList.add('modal-active-nav');
  // }
  // closeModalNav() {
  //   let modalBg = document.querySelector(
  //     '.prod-modal-bg-nav'
  //   ) as HTMLDivElement;

  //   modalBg?.classList.remove('modal-active-nav');
  // }
}
