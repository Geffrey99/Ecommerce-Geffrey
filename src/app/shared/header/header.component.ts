import { Component, OnInit } from '@angular/core';
import { CommonModule, ImageLoader } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductComponent } from '../../client/product/product.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
     RouterModule, CommonModule, ProductComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {
  // userLoginOn: boolean = false;
  // constructor(private loginservice: LoginService) {}
  

  // ngOnInit(): void {
  //     this.loginservice.currentUserLoginOn.subscribe(
  //       {
  //       next: (userLoginOn) => {
  //       this.userLoginOn = userLoginOn;
  //     }
  // })
  // }
}
