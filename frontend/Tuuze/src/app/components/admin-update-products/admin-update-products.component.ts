import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-update-products',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './admin-update-products.component.html',
  styleUrl: './admin-update-products.component.css'
})
export class AdminUpdateProductsComponent {
  updateForm!: FormGroup;
  productData: any;
  product_id!: string;


  constructor (public api:AuthServiceService, private router:Router, private fb:FormBuilder, private route: ActivatedRoute){

    this.updateForm=this.fb.group({
      // product_id: [this.product_id],
      name: ['', [Validators.required]],
      description:['', [Validators.required]],
      image:['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });

    this.route.params.subscribe(params => {
      this.product_id = params['product_id'];
      console.log('Product_id:', this.product_id); 
      this.api.getOneProduct(this.product_id).subscribe(data => {
        this.productData = data.message[0];
        console.log('Product Data:', this.productData);
        
        // Populate the form with the retrieved product data
        this.updateForm.patchValue({
          // product_id: this.productData.product_id,
          name: this.productData.name, 
          image: this.productData.image,
          description: this.productData.description,
          category: this.productData.category,
          quantity: this.productData.quantity,
          price: this.productData.price,
        });
      });
    });
  }

updateProduct(product_id: string): void {
  const newProduct = this.updateForm.value;
  this.api.updateProduct(product_id,newProduct ).subscribe(
    response=>{
      console.log(response.message);
    },
     error => {
      console.error('Error updating product:', error);
    }
  )  

  setTimeout(() => {
    this.updateForm.reset()
    this.router.navigate(['/admin'])
}, 2000);
}

}
