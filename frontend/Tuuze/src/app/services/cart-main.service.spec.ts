import { TestBed } from '@angular/core/testing';

import { CartMainService } from './cart-main.service';

describe('CartMainService', () => {
  let service: CartMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
