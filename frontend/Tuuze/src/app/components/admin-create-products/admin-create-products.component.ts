import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  selector: 'app-admin-create-products',
  standalone: true,
  imports: [NavbarComponent,FooterComponent, CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './admin-create-products.component.html',
  styleUrl: './admin-create-products.component.css'
})
export class AdminCreateProductsComponent {

  productForm!:FormGroup;

  constructor(public api:AuthServiceService ,private router:Router, private fb:FormBuilder) {



  this.productForm = this.fb.group({
    name: ['', [Validators.required]],
    description:['', [Validators.required]],
    image:['', [Validators.required]],
    quantity: ['', [Validators.required]],
    price: ['', [Validators.required]],
    category: ['', [Validators.required]]
  });
  }


  onSubmit(){
    if (this.productForm.valid) {
      console.log('product created successfull');

      const newProduct = this.productForm.value;

      this.api.createProduct(newProduct).subscribe(response=>{
        console.log(response);
        console.log('product sent to backend')

        setTimeout(() => {
          this.productForm.reset()
          this.router.navigate(['/admin'])
      }, 2000);


      })
    }
  }

}
