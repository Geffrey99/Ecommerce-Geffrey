import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../services/features/cart.service';
import { CheckoutComponent } from '../checkout/checkout.component';
import { Product } from '../../interface/Product';
import { CartItem } from '../../interface/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, ReactiveFormsModule, CheckoutComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  mostrarCheckout: boolean = false;

  constructor(private cartService: CartService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items: any[]) => {
      // Filtrar o transformar los elementos para asegurarse de que todos sean CartItem
      this.cartItems = items.map(item => {
        // Asumiendo que todos los elementos deberían tener una propiedad 'product'
        return {
          product: item.product || item, // Si no hay 'product', asume que el item es el producto
          quantity: item.quantity || 1   // Si no hay 'quantity', asume que la cantidad es 1
        };
      });
      console.log(this.cartItems); // Esto te mostrará los datos en la consola
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, cartItem) => acc + (cartItem.product?.price * cartItem.quantity || 0), 0);
  }

  removeProduct(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cd.detectChanges(); // Forzar la detección de cambios
  }


  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateCartItemQuantity(productId, quantity);
  }

  decreaseProductQuantity(productId: number): void {
    const product = this.cartItems.find(item => item.product.id === productId);
    if (product && product.quantity > 1) {
      this.updateQuantity(productId, product.quantity - 1);
    } else {
      window.alert('No puedes disminuir la cantidad a menos de 1.');
    }
  }


  existenProductos(): boolean {
    return this.cartItems.length > 0;
  }

  cancelarCompra(): void {
    this.mostrarCheckout = false;
    this.cartService.clearCart();
    this.cartItems = []; // Establece cartItems a un array vacío
    this.cd.detectChanges(); // Forzar la detección de cambios
  }

  manejarCancelarCompra(): void {
    this.mostrarCheckout = false;
  }

  trackByProduct(index: number, item: any): number {
    return item.product.id;
  }
}