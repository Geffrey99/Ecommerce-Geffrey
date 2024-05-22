import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { usuario } from '../services/auth/user';
@Component({
  selector: 'app-user',
  standalone: true,
  providers: [LoginService],
  imports: [CommonModule, HttpClientModule, RouterModule,HeaderComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  userLoginOn: boolean = false;
  userData?: usuario;
  constructor(private loginservice: LoginService) {}
  
  ngOnInit(): void {
    this.loginservice.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
      this.userLoginOn=userLoginOn;
    }
  });

    this.loginservice.currentUserData.subscribe({
      next: (userData) => {
      this.userData = userData;
      console.log(userData);
      }
    });
  }
  }