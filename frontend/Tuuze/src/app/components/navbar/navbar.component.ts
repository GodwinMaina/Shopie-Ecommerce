import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  cartSubscription: Subscription | undefined;

  isLoggedIn: boolean = false;
  isNotLoggedIn: boolean = false;
  admin: boolean = false;
  user: boolean = false;

  constructor(private cartService: CartService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn =
          this.router.url !== '/admin' &&
          this.router.url !== '/admin/create-products' &&
          this.router.url !== '/admin/update-products' &&
          this.router.url !== '/admin/view-users' &&
          this.router.url !== '/settings' &&
          this.router.url !== '/users';
        this.isNotLoggedIn =
          this.router.url !== '/' &&
          this.router.url !== '/auth/login' &&
          this.router.url !== '/register' &&
          this.router.url !== '/settings' &&
          this.router.url !== '/cart' &&
          this.router.url !== '/**';
        this.admin =
          this.router.url !== '/admin' &&
          this.router.url !== '/admin/create-products' &&
          this.router.url !== '/admin/update-products' &&
          this.router.url !== '/admin/settings' &&
          this.router.url !== '/admin/view-users';
        this.user =
          this.router.url !== '/users' && 
          this.router.url !== '/users/settings';
      }
    });
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItemsChanged.subscribe(() => {
      this.updateCartItemCount();
    });
    // Initial count
    this.updateCartItemCount();
  }

  updateCartItemCount(): void {
    const cartItems = this.cartService.getItems();
    this.cartItemCount = cartItems.length;
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  showProductNav() {
    let modalBg = document.querySelector(
      '.prod-modal-bg-nav'
    ) as HTMLDivElement;

    modalBg?.classList.add('modal-active-nav');
  }
  closeModalNav() {
    let modalBg = document.querySelector(
      '.prod-modal-bg-nav'
    ) as HTMLDivElement;

    modalBg?.classList.remove('modal-active-nav');
  }

  showHamburgerMenu() {
    let hamburgerList = document.querySelector('.mobile') as HTMLElement;

    hamburgerList?.classList.add('mobile-menu-active');
  }
  closeHamburgerMenu() {
    let hamburgerList = document.querySelector('.mobile') as HTMLElement;

    hamburgerList?.classList.remove('mobile-menu-active');
  }
}
