import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService } from '../../services/cart.service';
import { cartProduct } from '../../interfaces/createProducts';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink,NavbarComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  myproducts: any[] = [];

  product:any[]=[];

  constructor(public api:AuthServiceService, private router:Router,  private cartImplement: CartService, private snackBar: MatSnackBar){

    this.api.getAllProduct().subscribe( response=> {
      // console.log(response)
      this.myproducts=response.message
      console.log(this.myproducts)

    })
  }



  viewProductModal(product_id: string) {
    this.router.navigate(['/product', product_id]);
  }


  addToCart(product: cartProduct): void {
    const cartItems = this.cartImplement.getItems();
    const existsInCart = cartItems.some(item => item.product_id === product.product_id);
    if (!existsInCart) {
      // If product does not exist in cart, add it
      this.cartImplement.addToCart(product);
      window.alert('Product added to cart')
    }
   
    this.router.navigate(['/cart']);
  }
  



}
