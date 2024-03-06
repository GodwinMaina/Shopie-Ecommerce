import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserIdService {
  private user_id_key = 'user_id';
  private email_key = 'user_email';

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
}
