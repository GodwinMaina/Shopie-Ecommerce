
export interface createProducts{
  product_id:string,
  name:string,
  image:string,
  description:string,
  quantity:string,
  category :string,
  price:string,
}


export interface allProductsGet{


  message: [
    {
    product_id:string,
    name: string,
    image: string,
    description: string,
    quantity: string,
    price: string,
    category: string

  }
  ],
  error: []
}

export interface oneProductsGet{

  message: [
    {
    product_id:string,
    name: string,
    image: string,
    description: string,
    quantity: string,
    category: string,
    price: string,
  }
  ],
  error: []
}


export interface cartProduct{
  product_id: string,
  name:string,
  image:string,
  description:string,
  quantity:string,
  category :string,
  price:string,
}
