export interface cart {
  cart_id: number;
  user_id: number;
  date: string;
  products: cartProduct[];
  // __v: number;
}

export interface cartProduct {
  product_id: number;
  quantity: number;
}


export interface Rating {
  rate: number;
  count: number;
}

// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: Rating;
// }

// export { cart, Rating, cartProduct };
