import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allUsers, oneUser, userRegister } from '../interfaces/userRegister';
import { userLogin } from '../interfaces/userLogin';
import {  allProductsGet, cartDisplay, cartProduct, createProducts, oneProductsGet } from '../interfaces/createProducts';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  //......user AuthServiceService........

  //registerUser
  registerUser(userData:userRegister){
    return this.http.post<{ message: string, error: string }>('http://localhost:4000/users/register', userData)
  };

  //loginUser
  loginUser(email: string, password: string){
    const userLogs:userLogin ={email:email, password:password};
    return this.http.post<{isAdmin: any; message: string, error: string}>('http://localhost:4000/users/auth/login', userLogs);
  };




  //deleteUser
  deleteUser(user_id: string){
    return this.http.delete<{message:string, error:string}>(`http://localhost:4000/users/delete/${user_id}`)
  };


  //passwordReset
  passwordReset(newPassword:userLogin){
    interface passwordReset {
      message: string,
      error: string
    }
    return this.http.put<passwordReset>('http://localhost:4000/users/resetPassword' ,newPassword)
  };

  //updateUser === editing
  updateUser(user_id:string, userUpdate:userRegister){
    return this.http.put<{message:string, error:string}>(`http://localhost:4000/users/update/${user_id}`, userUpdate)
  };

  //getAllUsers
  getAllUsers(){
    return this.http.get<allUsers>('http://localhost:4000/users')
  }

  //getOneUser
  getOneUser(user_id:string){
    return this.http.get<oneUser>(`http://localhost:4000/users/${user_id}`)
  }

  //......End of user AuthServiceService.....


//....Products http Authservices....

//createProduct
createProduct(productData:createProducts){
  return this.http.post<{ message: string, error: string }>('http://localhost:4000/products/add', productData)
};


//fetch all product
getAllProduct(){
  return this.http.get<allProductsGet>('http://localhost:4000/products')
}


//fetch one product
getOneProduct(product_id:string){
  return this.http.get<oneProductsGet>(`http://localhost:4000/products/${product_id}`)
}


//update product
updateProduct(product_id:string, updateData:createProducts){
    return this.http.put<{message:string, error:string}>(`http://localhost:4000/products/update/${product_id}`, updateData)
  }


//delete product
deleteProduct(product_id:string){
  return this.http.delete<{message:string, error:string}>(`http://localhost:4000/products/delete/${product_id}`)
}

//........End Of products http Authservices........


 //cart services

 getUserCart(user_id: string){
  return this.http.get<cartDisplay>(`http://localhost:4000/cart/${user_id}`,{
    // headers: new HttpHeaders({
    //   'Content-type': 'application/json'
    // })
  })
}

getAllUsersCart(){
  return this.http.get<{product:cartProduct, error: string}>('http://localhost:4000/cart/',{
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  })
}

addProductToCart(productData: cartProduct): Observable<any> {
  const url = 'http://localhost:4000/cart/add';
  return this.http.post<any>(url, productData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}

deleteCart(cart_id: string){
  return this.http.post<{product:cartProduct, error: string}>(`http://localhost:4000/cart/delete/:${cart_id}`,{
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  })
}



}
