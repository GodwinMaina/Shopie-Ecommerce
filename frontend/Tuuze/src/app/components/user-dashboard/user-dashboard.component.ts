import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService } from '../../services/cart.service';
import { cartProduct } from '../../interfaces/createProducts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FooterComponent } from '../footer/footer.component';


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


  product_id!: string;
  product:any[]=[];

  selectedProduct:any;


  constructor(public api:AuthServiceService, private router:Router,  private cartImplement: CartService, private route: ActivatedRoute){

    this.api.getAllProduct().subscribe( response=> {
      // console.log(response)
      this.myproducts=response.message
      console.log(this.myproducts)

    })
  }



  // viewProductModal(product_id: string) {
  //   // this.showProduct(product_id)
  //   this.router.navigate(['/product', product_id]);
  // }


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

  showProduct(product_id: string) {
    let modalBg = document.querySelector('.prod-modal-bg') as HTMLDivElement;
    modalBg?.classList.add('modal-active');
    
    console.log('Product_id:', product_id); 
    // this.loading = true; // Set loading state to true
  
    this.api.getOneProduct(product_id).subscribe(response => {
      this.selectedProduct= response.message;
      console.log('Product Data:', this.productData);
     
      // this.loading = false; // Set loading state to false once product details are fetched
    });
  }
  

  closeModal(event:MouseEvent) {
    let modalBg = document.querySelector('.prod-modal-bg') as HTMLDivElement;
    modalBg?.classList.remove('modal-active');
}


  
}
  


