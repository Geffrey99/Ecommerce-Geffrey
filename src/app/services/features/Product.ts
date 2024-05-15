export interface Product {
  id?: number;
  description?: string;
  name?: string;
  price?: number;
  stock?: number;
  photo?: File | null;
  category_id?: number;
  category?: category; // La categoría del producto
}

    
  export interface category {
    id?: number;
    name?: string;

  }
  
  // export interface Product {
  //   id?: number; // El ID puede ser opcional si el producto aún no ha sido creado en el backend
  //   name: string;
  //   price: number;
  //   description: string;
  //   stock: number;
  //   // El archivo de la foto del producto
  // }