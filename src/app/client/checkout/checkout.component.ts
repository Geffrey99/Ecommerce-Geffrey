import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'cliente-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

constructor(private formBuilder: FormBuilder) {}

checkoutForm = this.formBuilder.group({
  name:'',
  address:''
});
 


onSubmit(): void {
  console.warn('Te llegara a tu correo el tickettt' + this.checkoutForm.value)
  this.checkoutForm.reset();
}

}
