import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { allProductsGet } from '../../interfaces/createProducts';
import { response } from 'express';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import {  ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ CommonModule,RouterLink,FooterComponent, NavbarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})


export class AdminDashboardComponent {


  myproducts: any[] = [];

  constructor(public api:AuthServiceService, private router:Router,private elementRef: ElementRef){

    this.api.getAllProduct().subscribe( response=> {
      // console.log(response)
      this.myproducts=response.message
      console.log(this.myproducts)

    })
  }

  deleteProduct(product_id: string): void {
    this.api.deleteProduct(product_id).subscribe(
      response => {
        console.log(response);

        this.api.getAllProduct().subscribe( response=> {
          // console.log(response)
          this.myproducts=response.message
          console.log(this.myproducts)

        })

      },
      error => {
        console.error('Error deleting tour:', error);
      }
    );

  }

  updateProduct(product_id: string): void {
      this.router.navigate(['/admin/update-products', product_id]);
  }



  showProduct() {
    let modalBg = document.querySelector('.prod-modal-bg') as HTMLDivElement;

    modalBg?.classList.add('modal-active');
  }
  closeModal() {
    let modalBg = document.querySelector('.prod-modal-bg') as HTMLDivElement;

    modalBg?.classList.remove('modal-active');
  }



  scrollToDiv() {
    const targetElement = this.elementRef.nativeElement.querySelector('.products-div');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Target element not found');
    }
  }


}
