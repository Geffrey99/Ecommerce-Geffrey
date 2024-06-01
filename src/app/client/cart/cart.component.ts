import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/features/cart.service';
import { Product } from '../../interface/producto';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService,
              private formBuilder:FormBuilder) {}
 
items = this.cartService.getItems();

checkoutForm = this.formBuilder.group({
  name:'',
  address:''
});






  ngOnInit(): void {
      this.cartService.cart$.subscribe((cart: Product[]) => {
          this.cart = cart;
      });
  }


  onSubmit(): void {
    this.items = this.cartService.clearCart();
    console.warn('Te llegara a tu correo el tickettt' + this.checkoutForm.value)
  
  this.checkoutForm.reset();
  
  }


}