export interface Product {
  product_id: number;
  quantity: number;
}

export interface cart {
  cart_id: string;
  user_id: string;
  date: string;
  products: Product[];
}

// export interface Category {
//     categoryId: string,
//     categoryName: string
// }

// export interface cartProduct {
//     user_id:string;
//     product_id: string;
//     name: string;
//     description: string;
//     price: string;
//     quantity:string; // Change the type to number
//     image: string;
//   }

export interface cartProduct {
  product_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}
