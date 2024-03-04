
import { Component, Input } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})


export class ProductModalComponent {
 
  productData: any[]=[];
  product_id!: string;
  constructor(private route: ActivatedRoute,private api:AuthServiceService) {

  this.route.params.subscribe(params => {
    this.product_id = params['product_id'];
    console.log('Product_id:', this.product_id); 
    this.api.getOneProduct(this.product_id).subscribe(response => {
      this.productData = response.message;
      console.log('Product Data:', this.productData);

    }

  )}
  
 ) 

}

}