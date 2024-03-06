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

 productQuantity=1;

  product_id!: string;
  product:any[]=[];


  selectedProduct:any;
  user_id!:string ;


  constructor(public api:AuthServiceService, private router:Router,  private cartService: CartService, private user:UserIDService){

    this.api.getAllProduct().subscribe( response=> {
      // console.log(response)
      this.myproducts=response.message
      console.log(this.myproducts)

    })
  }


  plusCart() {
    this.productQuantity++;
  }


  minusCart() {
    if (this.productQuantity > 0) {
      this.productQuantity--;
    }
  }



//     addToCart(product: cartProduct): void {

//     // const cartItems = this.cartService.getItems();
//     // const existsInCart = cartItems.some(item => item.product_id === product.product_id);
//     // if (!existsInCart) {
//     //   // If product does not exist in cart, add it
//     //   this.cartService.addToCart(product);
//     //   window.alert('Product added to cart')


//     // }

//     this.user_id = this.user.getUserId() || '';
//    console.log('User_id for logged user is:', this.user_id);

//    const data = {
//      user_id:this.user_id,
//      product: product
//     };

//   this.api.addProductToCart(data).subscribe(response=>{
//   console.log(response);

//    })

//     this.router.navigate(['/cart']);

//  }


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




  // private cartKeyValue = 'cartItems';
  // CartItems: cartProduct[] = [];

  // addToCart(product: cartProduct) {
  //   // Check if the product already exists in the cart
  //   const existingProductIndex = this.cartService.getItems().findIndex(item => item.product_id === product.product_id);

  //   if (existingProductIndex !== -1) {
  //     // If the product exists, update its quantity
  //     this.cartService.getItems()[existingProductIndex].quantity += this.productQuantity;
  //   } else {
  //     // If the product does not exist, add it to the cart with the current quantity
  //     product.quantity = this.productQuantity;
  //     this.cartService.addToCart(product);
  //   }

  //   // Reset product quantity after adding to cart to 0
  //   this.productQuantity = 0;
  //   this.closeModal()
  //   this.router.navigate(['/cart'])
  // }




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


}



