import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/features/cart.service';
import { Product } from '../../interface/Product';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from '../checkout/checkout.component';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, ReactiveFormsModule, CheckoutComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
mostrarCheckout: boolean = false;
  constructor(private cartService: CartService,
             ) {}
 
items = this.cartService.getItems();



  ngOnInit(): void {
      this.cartService.cart$.subscribe((cart: Product[]) => {
          this.cart = cart;
      });
  }

  getTotal(): number {
      return this.cart.reduce((acc, product) => acc + product.price, 0);
  }

  removeProduct( productoEliminar: Product ): void {
      this.cart = this.cart.filter(product => product.id! !== productoEliminar.id); 
        this.cartService.updateCart(this.cart);
  }

}