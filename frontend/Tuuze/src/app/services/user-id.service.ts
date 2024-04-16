

  // auth.service.ts

  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })

export class UserIDService {

  // private user_id: string | null = null;

  private user_id_key = 'user_id';
  private firstName_key = 'firstName';
  private email_key = 'user_email';

  // private email:string | null = null;

  constructor() {}

  setUserId(user_id: string): void {
    localStorage.setItem(this.user_id_key, user_id);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.user_id_key);
  }

  setEMail(email: string): void {
    localStorage.setItem(this.email_key, email);
  }

  getEmail(): string | null {
    return localStorage.getItem(this.email_key);
  }

  clearUserId(): void {
    localStorage.removeItem(this.user_id_key);
  }


  clearEmail(): void {
    localStorage.removeItem(this.email_key);
  }


  setName(firstName: string): void {
    localStorage.setItem(this.firstName_key, firstName);
  }

  getName(): string | null {
    return localStorage.getItem(this.firstName_key);
  }


}







