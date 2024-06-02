import { Injectable } from '@angular/core';
import { Product } from '../../interface/Product';
import { BehaviorSubject } from 'rxjs';
import { OrderDetail } from '../../interface/orderDetail';
@Injectable({
    providedIn: 'root'
})
export class CartService {

    // private cart: Product[] = [];
    private cartSubject = new BehaviorSubject<Product[]>(this.loadCart());
    // items:Product[] = [];
    cart$ = this.cartSubject.asObservable();

    addToCart(product: Product): void {
      const currentCart = this.cartSubject.value;
       currentCart.push(product);
        this.saveCart(currentCart);
    }

    getCart(): Product[] {
      return this.cartSubject.value;
    }
  
    clearCart(): void {
      this.saveCart([]);
    }
  
    updateCart(newCart: Product[]): void {
      this.saveCart(newCart);
    }
    

    private saveCart(cart: Product[]): void {
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartSubject.next(cart);
    }

  private loadCart(): Product[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  getOrderDetails(): OrderDetail[] {
    const cartProducts = this.cartSubject.value;
    return cartProducts.map(product => {
      return {
        productId: product.id,
        cantidad: 1, // Aquí asumimos que la cantidad es 1 por defecto, ajusta según tu lógica
        precio: product.price
      };
    });
  }




}
