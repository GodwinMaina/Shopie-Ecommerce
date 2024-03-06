import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserIDService } from '../../services/user-id.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartProducts = this.cartImplement.getItems();

  cartProd: any[]=[];
  user_id!:string ;

  constructor(private cartImplement :CartService, private api:AuthServiceService, private user:UserIDService){}

  remove(product_id:string){
    this.cartImplement.removeFromCart(product_id);
  }

  plusCart(){

  }

  minusCart(){

  }



// Inside your component
fetchUserCartProducts(user_id: string): void {

this.user_id= this.user.getUserId() || '';

  this.api.getUserCart(user_id).subscribe({
    next: (response) => {
      if (response.error) {
        console.error('Error fetching user cart products:', response.error);
        // Handle error (e.g., display error message to the user)
      } else {
        this.cartProd = response.; // Assuming response has a 'cart' property containing cart products
      }
    },
    error: (err) => {
      console.error('Error fetching user cart products:', err);
      // Handle error (e.g., display error message to the user)
    }
  });
}





 }



// import { Component, OnInit  } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
// // import { Rating } from '../../interfaces/cartInterface'
// // import { createProducts } from '../../interfaces/createProducts';
// import { AuthServiceService } from '../../services/auth-service.service';

// import { NavbarComponent } from '../navbar/navbar.component';
// import { CartMainService } from '../../services/cart-main.service';
// import { UserIDService } from '../../services/user-id.service';


// @Component({
//   selector: 'app-cart-modal',
//   standalone: true,
//   imports: [ CommonModule, RouterLink, RouterOutlet, NavbarComponent],
//   templateUrl: './cart.component.html',
//  styleUrl: './cart.component.css'
// })

// export class CartComponent  implements OnInit {

//   cartItems:  any[] = [];
//   isCartOpen: boolean = false;
//   user_id: string | null | undefined;

//   constructor(private api: UserIDService, private router: Router, private cartService: CartMainService, private auth:AuthServiceService) {  }
//   ngOnInit() {
//     // Subscribe to cart items changes
//     this.cartService.cart$.subscribe(cart => {
//       this.cartItems = cart;
//     });

//     // Subscribe to cart open status changes
//     this.cartService.isCartOpen$.subscribe(isOpen => {
//       console.log('Is cart open?', isOpen);
//       this.isCartOpen = isOpen;
//     });

//     // Retrieve user_id
//     this.user_id = this.api.getUserId();
//     console.log('User ID:', this.user_id);

//     console.log('am in cart page');


//     // Check if user_id is not null before calling fetchSingleCart
//     if (this.user_id !== null) {
//       console.log('Fetching cart for user_id:', this.user_id);
//       this.fetchSingleCart(this.user_id);
//     } else {
//       console.warn('User ID is null. Cannot fetch cart.');
//     }
//   }

//   fetchSingleCart(user_id: string) {
//     console.log(user_id);

//     this.auth.getUserCart(user_id).subscribe(
//       (res) => {
//         console.log('API Response:', res);

//         if (res && res.cart && res.cart.length > 0) {
//           console.log('Fetched Single Cart:', res.cart[0]);
//           const productsArray = JSON.parse(res.cart[0].products);
//           this.cartItems = productsArray
//         } else {
//           console.error('Invalid response or no cart found:', res);
//         }
//       },
//       (error) => {
//         console.error('Error fetching single cart:', error);
//       },
//       () => {
//         console.log('Fetch operation completed.');
//       }
//     );
//   }


//   getTotalItems(): number {
//     return this.cartItems.reduce((total, cart) => total + cart.products.length, 0);
//   }

//   checkout() {
//     console.log('Checking out...');
//   }

//   closeCart() {
//     console.log('Closing cart...');
//   }

// }

