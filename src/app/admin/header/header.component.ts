import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { usuario } from '../../services/auth/user';
import { LoginService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../features/product/product.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'admin-header',
  standalone: true,
  imports: [CommonModule,ProductComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderAdminComponent implements OnInit{
  userLoginOn: boolean = false;
  userData?: usuario;
  
  constructor(
    private loginService: LoginService,
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