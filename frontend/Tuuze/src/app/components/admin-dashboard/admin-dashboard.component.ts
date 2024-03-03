import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { allProductsGet } from '../../interfaces/createProducts';
import { response } from 'express';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ CommonModule,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})


export class AdminDashboardComponent {


  myproducts: any[] = [];

  constructor(public api:AuthServiceService, private router:Router){

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

      },
      error => {
        console.error('Error deleting tour:', error);
      }
    );
  }

  updateProduct(product_id: string): void {
      this.router.navigate(['/admin/update-products', product_id]);
  }
}
