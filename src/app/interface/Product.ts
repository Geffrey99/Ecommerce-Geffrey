export interface Product {
  photoPath: string;
  id: number;
  name: string;
  price: number;
  photoUrl: string;
  description: string;
  stock: number;
  category?: {
    id: number;
    name: string;
  };
}

