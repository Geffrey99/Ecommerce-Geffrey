import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { usuario } from '../../interface/user';
import { LoginService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../client/product/product.component';
import { RouterModule } from '@angular/router';
import { Router }  from '@angular/router';

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
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
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

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/iniciar-sesion']);
  }
}