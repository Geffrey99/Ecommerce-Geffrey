import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { usuario } from '../services/auth/user';
import { ProductComponent } from '../features/product/product.component';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, ProductComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  userLoginOn: boolean = false;
  userData?: usuario;

  constructor(private loginService: LoginService,
              private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        console.log('UserComponent - Login status:', userLoginOn);
      }
    });

    this.loginService.userData.subscribe({
      next: (userData) => {
        if (userData) {
          this.userData = userData;
          this.changeDetectorRef.detectChanges(); // Forzar la detección de cambios
          console.log('UserComponent - User data:', userData);
        } else {
          console.log('User data is null');
        }
      }
    });
  }
}