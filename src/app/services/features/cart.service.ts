import { Injectable } from '@angular/core';
import { Product } from '../../interface/Product';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cart: Product[] = [];
    private cartSubject = new BehaviorSubject<Product[]>([]);
    items:Product[] = [];
    cart$ = this.cartSubject.asObservable();

    addToCart(product: Product): void {
        this.cart.push(product);
        this.cartSubject.next(this.cart);
    }

    getCart(): Product[] {
        return this.cart;
    }

    // clearCart(): void {
    //     this.cart = [];
    //     this.cartSubject.next(this.cart);
    // }

    //recopila los artículos que los usuarios agregan al carrito y devuelve cada artículo con su cantidad asociada.
getItems() {
    return this.items;


    //método devuelve una serie vacía de artículos, lo que vacía el carrito.

  
  }
 
  
  clearCart() {
    this.items = [];
    return this.items;
  }

  

}
