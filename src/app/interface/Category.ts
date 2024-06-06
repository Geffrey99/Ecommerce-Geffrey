export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    photoPath: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    products: Product[];
  }