import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/features/cart.service';
import { Product } from '../../services/producto';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
      this.cartService.cart$.subscribe((cart: Product[]) => {
          this.cart = cart;
      });
  }
}