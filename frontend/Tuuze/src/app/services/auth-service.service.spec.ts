import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from './auth-service.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { expectedUsers } from './testdata/user';
import { expectedProducts } from './testdata/products';
import { expectedCart } from './testdata/cart';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthServiceService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('registers a user', () => {
    let mockUser = {
      firstName: 'user',
      lastName: 'user',
      email: 'user@gmail.com',
      password: 'user',
    };
    service
      .registerUser(mockUser)
      .subscribe((res) => {
        expect(res.message).toEqual('Account created successfully');
      });

    const mockReq = testingController.expectOne('http://localhost:4000/users/register');
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.body).toEqual(mockUser);
    mockReq.flush({ message: 'Account created successfully' });
  });
  it('logs in a user', ()=>{
    service.loginUser('user@gmail.com', 'user').subscribe((res) => {
      expect(res.message).toEqual('Logged  in successfully');
    });

    let mockUser = {
      email: 'user@gmail.com',
      password: 'user',
    };

    const mockReq = testingController.expectOne('http://localhost:4000/users/auth/login');
    expect(mockReq.request.method).toEqual('POST')
    expect(mockReq.request.body).toEqual(mockUser)
    mockReq.flush({message: "Logged  in successfully"})
  })
  it('deletes a user', ()=>{
    let id = '9c2d76fb-1808-4422-8b87-73d594f83d79';

    service.deleteUser(id).subscribe((res:any)=>{
      expect(res).toBeTruthy();
      expect(res.message).toBe('Account deleted successfully')
    })

    const mockReq = testingController.expectOne(`http://localhost:4000/users/delete/${id}`)
    expect(mockReq.request.method).toBe('DELETE')
  })
   it('resetting password', ()=>{
    let mockUser = {
      email: 'user@gmail.com',
      password: 'user',
    };

    service.passwordReset(mockUser).subscribe((res) => {
      expect(res.message).toEqual('Password changed successfully');
    });

    const mockReq = testingController.expectOne('http://localhost:4000/users/resetPassword');
    expect(mockReq.request.method).toEqual('PUT')
    expect(mockReq.request.body).toEqual(mockUser)
    mockReq.flush({ message: 'Password changed successfully' });
  })
  it('changing user details', ()=>{
    let id = '9c2d76fb-1808-4422-8b87-73d594f83d79';

    let mockUser = {
      firstName: 'user',
      lastName: 'user',
      email: 'user@gmail.com',
      password: 'user',
    };

    service.updateUser(id,mockUser).subscribe((res) => {
      expect(res.message).toEqual('User details changed successfully');
    });

    const mockReq = testingController.expectOne(`http://localhost:4000/users/update/${id}`);
    expect(mockReq.request.method).toEqual('PUT')
    expect(mockReq.request.body).toEqual(mockUser)
    mockReq.flush({ message: 'User details changed successfully' });
  })

  it('gets all users', () => {
    service.getAllUsers().subscribe((users: any) => {
      expect(users).toBeTruthy();
      expect(users.length).toBe(3);
    });

    const mockReq = testingController.expectOne('http://localhost:4000/users');
    mockReq.flush(Object.values(expectedUsers));
    expect(mockReq.request.method).toBe('GET');
  });
  it('gets user by id', ()=>{
    let id = '9c2d76fb-1808-4422-8b87-73d594f83d79';

    service.getOneUser(id).subscribe((user:any)=>{
      expect(user).toBeTruthy();
      expect(user.email).toBe('sharon@yopmail.com');
    })

    const mockReq = testingController.expectOne(`http://localhost:4000/users/${id}`)
    mockReq.flush(expectedUsers[0])
    expect(mockReq.request.method).toBe('GET')
  })
  it('creates a product', () => {
    let mockProduct = {
      product_id: "72d5bdb0-e76a-42ef-a1d7-c944f93f6e2f",
      name: "JEANS BLUE",
      image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/785059/6.jpg?9552",
      description: "Blue Denim Jeans",
      quantity: "500",
      category: "Jeans",
      price: "4,500"
    };
    service
      .createProduct(mockProduct)
      .subscribe((res) => {
        expect(res.message).toEqual('Account created successfully');
      });

    const mockReq = testingController.expectOne('http://localhost:4000/products/add');
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.body).toEqual(mockProduct);
    mockReq.flush({ message: 'Account created successfully' });
  });
  it('gets all products', () => {
    service.getAllProduct().subscribe((products: any) => {
      expect(products).toBeTruthy();
      expect(products.length).toBe(2);
    });

    const mockReq = testingController.expectOne('http://localhost:4000/products');
    mockReq.flush(Object.values(expectedProducts));
    expect(mockReq.request.method).toBe('GET');
  });
  it('gets product by id', ()=>{
    let id = '907f7000-0da4-4891-9d4e-d0dd8513414c';

    service.getOneProduct(id).subscribe((product:any)=>{
      expect(product).toBeTruthy();
      expect(product.category).toBe('Jeans');
    })

    const mockReq = testingController.expectOne(`http://localhost:4000/products/${id}`)
    mockReq.flush(expectedProducts[0])
    expect(mockReq.request.method).toBe('GET')
  })

  it('changing product details', ()=>{
    let id = '9c2d76fb-1808-4422-8b87-73d594f83d79';

    let mockProduct = {
      product_id : '9c2d76fb-1808-4422-8b87-73d594f83d79',
      name: "JEANS BLUE",
      image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/785059/6.jpg?9552",
      description: "Blue Denim Jeans",
      quantity: "500",
      category: "Jeans",
      price: "4,500"
    };

    service.updateProduct(id,mockProduct).subscribe((res) => {
      expect(res.message).toEqual('Product details changed successfully');
    });

    const mockReq = testingController.expectOne(`http://localhost:4000/products/update/${id}`);
    expect(mockReq.request.method).toEqual('PUT')
    expect(mockReq.request.body).toEqual(mockProduct);
    mockReq.flush({ message: 'Product details changed successfully' });
  })

  it('deletes a product', ()=>{
    let id = '907f7000-0da4-4891-9d4e-d0dd8513414c';

    service.deleteProduct(id).subscribe((res:any)=>{
      expect(res).toBeTruthy();
      expect(res.message).toBe('Account deleted successfully')
    })

    const mockReq = testingController.expectOne(`http://localhost:4000/products/delete/${id}`)
    expect(mockReq.request.method).toBe('DELETE')
  })
  it('gets user cart by user id', ()=>{
    let id='2d894b97-f4f0-4969-bf77-e1be818a60db'

    service.getCartyLogic2(id).subscribe((user:any)=>{
      expect(user).toBeTruthy();
      expect(user.cart_id).toBe('2d894b97-f4f0-4969-bf77-e1be8ggdgd0db');
    })

    const mockReq = testingController.expectOne(`http://localhost:4000/cart/getCarty/${id}`)
    mockReq.flush(expectedCart[0])
    expect(mockReq.request.method).toBe('GET')
  })
  it('gets all products in cart', () => {
    service.getAllUsersCart().subscribe((products: any) => {
      expect(products).toBeTruthy();
      expect(products.length).toBe(2);
    });

    const mockReq = testingController.expectOne('http://localhost:4000/cart/');
    mockReq.flush(Object.values(expectedCart));
    expect(mockReq.request.method).toBe('GET');
  });
  it('creates a product in a cart', () => {
      let mockCart={
          product_id: '72d5bdb0-e76a-42ef-a1d7-c944f93f6e2f',
          name: 'JEANS BLUE',
          image:
            'https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/785059/6.jpg?9552',
          description: 'Blue Denim Jeans',
          quantity: 500,
          category: 'Jeans',
          price: '4,500'
         }
    service.addToCartlogic2(mockCart).subscribe((res) => {
      expect(res.message).toEqual('Product added in cart successfully');
    });

    const mockReq = testingController.expectOne(
      'http://localhost:4000/cart/carty/'
    );
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.body).toEqual(mockCart);
    mockReq.flush({ message: 'Product added in cart successfully' });
  });
  it('deletes a product in cart', ()=>{
    let id = '2d894b97-f4f0-4969-bf77-e1be8ggdgd0db';

    service.deleteCarty(id).subscribe((res:any)=>{
      expect(res).toBeTruthy();
      expect(res.message).toBe('Product in cart deleted successfully')
    })

    const mockReq = testingController.expectOne(`http://localhost:4000/cart/carty/delete/${id}`)
    expect(mockReq.request.method).toBe('DELETE')
  })

});
