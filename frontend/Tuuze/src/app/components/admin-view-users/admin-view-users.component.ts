import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-admin-view-users',
  standalone: true,
  imports: [NavbarComponent,FooterComponent, CommonModule, RouterLink],
  templateUrl: './admin-view-users.component.html',
  styleUrl: './admin-view-users.component.css'
})
export class AdminViewUsersComponent {

  myUsers:any[]=[];

  constructor(public api:AuthServiceService, router:Router){

    this.api.getAllUsers().subscribe(response=>{
      console.log(response);
      this.myUsers=response.message
      console.log(this.myUsers);


    })
  }


}



