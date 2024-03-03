import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FooterComponent,NavbarComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  // myUsers:any[]=[];
  passwordForm: FormGroup;

  constructor(private api: AuthServiceService, private fb: FormBuilder , public router:Router) {
    this.passwordForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // this.api.getAllUsers().subscribe(response => {
    //   console.log(response);
    //   this.myUsers = response.message;
    //   console.log(this.myUsers);
    // });

}

  reset(): void {
    let newPassword = this.passwordForm.value
    this.api.passwordReset(newPassword).subscribe(response=>{
    console.log(response.message);

    setTimeout( () =>{
      this.passwordForm.reset()
      this.router.navigate(['/auth/login'])

    },3000)

  })
}

}

