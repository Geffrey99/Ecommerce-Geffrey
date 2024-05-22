import { Component, OnInit } from '@angular/core';
import { CommonModule, ImageLoader } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from '../../user/user.component';
import { LoginService } from '../../services/auth/login.service';
import { ProductComponent } from '../../features/product/product.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
     RouterModule, UserComponent, CommonModule, ProductComponent],
 providers: [LoginService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent implements OnInit{
  userLoginOn: boolean = false;
  constructor(private loginservice: LoginService) {}
  

  ngOnInit(): void {
      this.loginservice.currentUserLoginOn.subscribe(
        {
        next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
  })
  }
}
