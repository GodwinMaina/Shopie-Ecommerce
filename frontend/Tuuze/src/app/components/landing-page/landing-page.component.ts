

import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CartService } from '../../services/cart.service';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  myproducts: any[] = [];
  productData: any[] = [];

  product_id!: string;
  product: any[] = [];

  selectedProduct: any;

  constructor(public api:AuthServiceService, private router:Router,  private cartImplement: CartService, private route: ActivatedRoute, private elementRef: ElementRef, private renderer: Renderer2){


    this.api.getAllProduct().subscribe( response=> {
      // console.log(response)
      this.myproducts=response.message
      console.log(this.myproducts)

    })

  }


  scrollToDiv() {
    const targetElement = this.elementRef.nativeElement.querySelector('.products-div');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Target element not found');
    }
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
  }

  toLogin(){
    this.router.navigate(['/auth/login'])
  }
}