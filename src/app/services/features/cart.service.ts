import { Injectable } from '@angular/core';
import { Product } from './Product';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cart: Product[] = [];
    private cartSubject = new BehaviorSubject<Product[]>([]);

    cart$ = this.cartSubject.asObservable();

    addToCart(product: Product): void {
        this.cart.push(product);
        this.cartSubject.next(this.cart);
    }

    getCart(): Product[] {
        return this.cart;
    }

    clearCart(): void {
        this.cart = [];
        this.cartSubject.next(this.cart);
    }
}
