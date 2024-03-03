import { Injectable } from '@angular/core';
import { cartProduct } from '../interfaces/createProducts';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKeyValue = 'cartItems';
  CartItems: cartProduct[] = [];

  private cartItemsSubject = new BehaviorSubject<cartProduct[]>(this.CartItems);

  cartItemsChanged = this.cartItemsSubject.asObservable();

  constructor() {
    const storedCartItems = localStorage.getItem(this.cartKeyValue);
    if (storedCartItems) {
      this.CartItems = JSON.parse(storedCartItems);
    }
  }

  addToCart(product: cartProduct) {
    // Check if the product already exists in the cart
    const existsInCart = this.CartItems.some(item => item.product_id === product.product_id);
    if (!existsInCart) {
      // If product does not exist in cart, add it
      this.CartItems.push(product);
      this.updateLocalStorage();
    }
  }

  getItems(): cartProduct[] {
    return this.CartItems;
  }

  removeFromCart(product_id: string) {
    this.CartItems = this.CartItems.filter(item => item.product_id !== product_id);
    this.updateLocalStorage();
  }

  clearCart() {
    this.CartItems = [];
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    // Store cart items in local storage
    localStorage.setItem(this.cartKeyValue, JSON.stringify(this.CartItems));
  }

}
