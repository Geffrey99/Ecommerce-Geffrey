import { Injectable } from '@angular/core';
import { Product } from '../../interface/Product';
import { BehaviorSubject } from 'rxjs';
import { OrderDetail } from '../../interface/orderDetail';
import { CartItem } from '../../interface/cart';

@Injectable({
    providedIn: 'root'
})

export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  addToCart(product?: Product): void {
    if (!product || typeof product.id === 'undefined') {
      console.error('Intento de añadir un producto indefinido al carrito.');
      return;
    }
  
    const currentCart = this.cartSubject.value;
    // Encuentra el índice del producto en el carrito.
    const cartItemIndex = currentCart.findIndex(item => item.product && item.product.id === product.id);
  
    if (cartItemIndex !== -1) {
      // El producto ya está en el carrito, incrementa la cantidad
      const cartItem = currentCart[cartItemIndex];
      if (cartItem.quantity < product.stock) {
        cartItem.quantity++;
      } else {
        window.alert('No puedes añadir más de este producto, ya has alcanzado el límite de stock disponible en el carrito.');
      }
    } else {
      // El producto no está en el carrito, añádelo
      currentCart.push({ product, quantity: 1 });
    }
  
    this.saveCart(currentCart);
  }
  

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }

  removeFromCart(productId: number): void {
    let currentCart = this.cartSubject.value;
    const cartItemIndex = currentCart.findIndex(item => item.product && item.product.id === productId);

    if (cartItemIndex !== -1) {
      currentCart.splice(cartItemIndex, 1);
      this.saveCart(currentCart);
    }
  }

  updateCartItemQuantity(productId: number, quantity: number): void {
    let currentCart = this.cartSubject.value;
    const cartItemIndex = currentCart.findIndex(item => item.product && item.product.id === productId);
  
    if (cartItemIndex !== -1) {
      const cartItem = currentCart[cartItemIndex];
      // Asegúrate de que la cantidad no sea negativa y no exceda el stock
      if (quantity >= 0 && quantity <= cartItem.product.stock) {
        cartItem.quantity = quantity;
        this.saveCart(currentCart);
      } else if (quantity > cartItem.product.stock) {
        window.alert('No hay suficiente stock para actualizar la cantidad de este producto.');
      } else {
        window.alert('La cantidad no puede ser negativa.');
      }
    } else {
      window.alert('El producto no se encuentra en el carrito.');
    }
  }

  clearCart(): void {
    this.saveCart([]);
  }

  private saveCart(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  private loadCart(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  getOrderDetails(): OrderDetail[] {
    const cartItems = this.cartSubject.value;
    return cartItems.map(cartItem => {
      return {
        productId: cartItem.product.id,
        cantidad: cartItem.quantity,
        precio: cartItem.product.price * cartItem.quantity
      };
    });
  }
}

