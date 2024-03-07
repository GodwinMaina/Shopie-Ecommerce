import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserIDService } from '../../services/user-id.service';
import {  cartProduct} from '../../interfaces/createProducts';
import { cartData } from '../../interfaces/createProducts';
import { Router } from '@angular/router';

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
  email!: string;
  productQuantity!:number;


   // logic2
   cartlog2:any[]=[];
   productlog2!:number;

  constructor(private cartImplement :CartService, private api:AuthServiceService, private user:UserIDService, private router:Router){


    // this.fetchUserCartProducts()

    // logic2
    this.fetchylogic2()
  }

  //remove item from cart
  remove(cart_id:string){
    this.api.deleteCart(cart_id).subscribe(
      response=>{
        console.log(response.message);
        this.fetchUserCartProducts();
      }
    )
  }


  plusCart(){
    this.productQuantity++;

  }


  minusCart(){
    if (this.productQuantity > 0) {
      this.productQuantity--;
    }

  }

  fetchUserCartProducts(): void {
    this.user_id= this.user.getUserId() || '';
    this.api.getUserCart(this.user_id).subscribe(response=>{
      console.log(response);

      this.cartProd= response.message

      this.productQuantity=response.message[0].quantity

      this.email=this.user.getEmail() || '';

    })

    console.log('cartpage');

}




addToCart(product: cartProduct): void {
  // Get the user ID from your AuthServiceService
  this.user_id= this.user.getUserId() || '';

  console.log(this.user_id);

console.log('123456789');

  // Prepare the product data
  const productData: cartData = {
    user_id: this.user_id,
    product_id: product.product_id,
    name: product.name,
    category: product.category,
    description: product.description,
    price: product.price,
    quantity: this.productQuantity,
    image: product.image
  };

  this.fetchUserCartProducts()

  this.api.addProductToCart(productData).subscribe({
    next: (response) => {
      console.log('Product added to cart:', response);
    },
    error: (err) => {
      console.error('Error adding product to cart:', err);
    }
  });
  this.fetchUserCartProducts()
}





// logic 2


fetchylogic2(): void {
  this.user_id= this.user.getUserId() || '';
  this.api.getCartyLogic2(this.user_id).subscribe(response=>{
    console.log(response);

    this.cartlog2= response.message

    this.productQuantity=response.message[0].quantity

    this.email=this.user.getEmail() || '';

  })

  console.log('cartpagelog2');

}






addToCartLog2(product: cartProduct): void {
  // Get the user ID from your AuthServiceService
  this.user_id= this.user.getUserId() || '';

  console.log(this.user_id);

console.log('123456789');

  // Prepare the product data
  const productData: cartData = {
    user_id: this.user_id,
    product_id: product.product_id,
    name: product.name,
    category: product.category,
    description: product.description,
    price: product.price,
    quantity: this.productQuantity,
    image: product.image
  };

   this.fetchylogic2()

  this.api.addToCartlogic2(productData).subscribe({
    next: (response) => {
      console.log('Product added to cart:', response);
    },
    error: (err) => {
      console.error('Error adding product to cart:', err);
    }
  });
  this.fetchylogic2()
}




removeCarty(cart_id:string){
  this.api.deleteCarty(cart_id).subscribe(
    response=>{
      console.log(response);
      this.fetchylogic2();
    }
  )
}

logOut(){
  this.router.navigate(["/auth/login"])
  this.user.clearUserId()
  this.user.clearEmail()
}




 }


