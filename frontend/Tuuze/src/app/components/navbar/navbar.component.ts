
import { RouterLink } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItemsChanged.subscribe(() => {
      this.updateCartItemCount();
    });
    // Initial count
    this.updateCartItemCount();
  }

  updateCartItemCount(): void {
    const cartItems = this.cartService.getItems();
   // this.cartItemCount = cartItems.length;
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }
}
