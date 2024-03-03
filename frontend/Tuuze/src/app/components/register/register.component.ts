import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Route, Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,  FormGroup, Validators,FormBuilder } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,RouterLink,CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  successMessage: string = '';
  showSuccessMessage:boolean = false;

  constructor(private fb:FormBuilder, public api:AuthServiceService,  private router: Router){


    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]]
                        }, { validator: this.passwordMatchValidator });

  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ mismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }



  onSubmit() {

    if (this.registerForm.valid) {

      let userData = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.api.registerUser(userData).subscribe(response => {
        console.log(response);
      });


      this.successMessage = 'Signup successful';
      this.showSuccessMessage = true;
      this.registerForm.reset();

        setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['auth/login']);
        }, 2000);

  }
   else {
    this.registerForm.markAllAsTouched();
  }
}

}
