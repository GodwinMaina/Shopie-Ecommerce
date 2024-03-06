import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService } from '../../services/cart.service';
import { cartData,cartProduct } from '../../interfaces/createProducts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FooterComponent } from '../footer/footer.component';
import { UserIdService } from '../../services/user-id.service';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  myproducts: any[] = [];
  productData: any[] = [];

  productQuantity = 1;

  product_id!: string;
  product: any[] = [];

  selectedProduct: any;
  user_id!: string;

  constructor(
    public api: AuthServiceService,
    private router: Router,
    private cartImplement: CartService,
    private user: UserIdService,
    private route: ActivatedRoute
  ) {
    this.api.getAllProduct().subscribe((response) => {
      // console.log(response)
      this.myproducts = response.message;
      console.log(this.myproducts);
    });
  }

  plusCart() {
    this.productQuantity++;
  }

  minusCart() {
    if (this.productQuantity > 0) {
      this.productQuantity--;
    }
  }

  // viewProductModal(product_id: string) {
  //   // this.showProduct(product_id)
  //   this.router.navigate(['/product', product_id]);
  // }

  // addToCart(product: cartProduct): void {
  //   const cartItems = this.cartImplement.getItems();
  //   const existsInCart = cartItems.some(
  //     (item) => item.product_id === product.product_id
  //   );
  //   if (!existsInCart) {
  //     // If product does not exist in cart, add it
  //     this.cartImplement.addToCart(product);
  //     window.alert('Product added to cart');
  //   }

  //   this.router.navigate(['/cart']);
  // }

  addToCart(product: cartProduct): void {
    // Get the user ID from your AuthServiceService
    this.user_id = this.user.getUserId() || '';

    console.log(this.user_id);

    // Prepare the product data
    const productData: cartData = {
      user_id: this.user_id,
      product_id: product.product_id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      quantity: this.productQuantity,
      image: product.image,
    };
    // Call the service method to add the product to the cart
    this.api.addProductToCart(productData).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
        // Optionally, provide feedback to the user about the success of the operation
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        // Optionally, handle error and provide feedback to the user
      },
    });

    this.router.navigate(['/cart']);
  }
  viewprod(product_id: string) {
    this.api.getOneProduct(product_id).subscribe((response) => {
      this.selectedProduct = response.message;
      console.log('Product Data:', this.productData);
    });
  }

  showProduct() {
    let modalBg = document.querySelector('.prod-modal-bg') as HTMLDivElement;
    modalBg?.classList.add('modal-active');
  }

  closeModal() {
    let modalBg = document.querySelector('.prod-modal-bg') as HTMLDivElement;
    modalBg?.classList.add('modal-close');
    console.log('closeddd');
  }

  // showProduct(product_id: string) {
  //   let modalBg = document.querySelector('.prod-modal-bg') as HTMLDivElement;
  //   modalBg?.classList.add('modal-active');

  //   console.log('Product_id:', product_id);
  //   // this.loading = true; // Set loading state to true

  //   this.api.getOneProduct(product_id).subscribe((response) => {
  //     this.selectedProduct = response.message;
  //     console.log('Product Data:', this.productData);

  //     // this.loading = false; // Set loading state to false once product details are fetched
  //   });
  // }

  // closeModal(event: MouseEvent) {
  //   let modalBg = document.querySelector('.prod-modal-bg') as HTMLDivElement;
  //   modalBg?.classList.remove('modal-active');
  // }
}
