import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService } from '../../services/cart.service';
import { cartData, cartProduct } from '../../interfaces/createProducts';
import { FooterComponent } from '../footer/footer.component';
import { UserIDService } from '../../services/user-id.service';
import {  ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink,NavbarComponent, FooterComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  myproducts: any[] = [];
  productData: any[]=[];

  productQuantity:number=1;

  product_id!: string;
  product:any[]=[];


  selectedProduct:any;
  user_id!:string ;


  constructor(public api:AuthServiceService, private router:Router,  private cartService: CartService, private user:UserIDService, private elementRef: ElementRef){

    this.api.getAllProduct().subscribe( response=> {
      // console.log(response)
      this.myproducts=response.message
      console.log(this.myproducts)

    })
  }

  plusCart(){
    this.productQuantity++;

  }


  minusCart(){
    if (this.productQuantity > 0) {
      this.productQuantity--;
    }

  }


  scrollToDiv() {
    const targetElement = this.elementRef.nativeElement.querySelector('.products-div');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Target element not found');
    }
  }


 addToCart(product: cartProduct): void {
  // Get the user ID from your AuthServiceService
  this.user_id= this.user.getUserId() || '';

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
    image: product.image
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
    }
  });

  this.router.navigate(['/cart'])
}



  viewprod(product_id: string){
    this.api.getOneProduct(product_id).subscribe(response => {
      this.selectedProduct= response.message;
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


// add to cart logic 2

addToCartLogic2(product: cartProduct): void {

  this.user_id= this.user.getUserId() || '';

  console.log(this.user_id);

  const productData: cartData = {
    user_id: this.user_id,
    product_id: product.product_id,
    name: product.name,
    category: product.category,
    description: product.description,
    price: product.price,
    quantity:this.productQuantity,
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

  this.router.navigate(['/cart'])
  this.fetchylogic2()
}


fetchylogic2(): void {
  this.user_id= this.user.getUserId() || '';
  this.api.getCartyLogic2(this.user_id).subscribe(response=>{
    console.log(response);


  })

  console.log('cartpagelog2');

}

}



