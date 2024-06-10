import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductComponent } from '../../client/product/product.component';
import { LoginService } from '../../services/auth/auth.service';
import { CategoryService } from '../../services/features/category.service';
import { Category } from '../../interface/Category';
import { usuario } from '../../interface/user';

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [CommonModule,ProductComponent, RouterModule],
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.css'
})
export class HeaderClienteComponent  implements OnInit{
  userLoginOn: boolean = false;
  userData?: usuario;
  categories: Category[] = [];

  constructor(
    private loginService: LoginService,
    private changeDetectorRef: ChangeDetectorRef,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loginService.userLoginOn.subscribe((userLoginOn) => {
      this.userLoginOn = userLoginOn;
      console.log('UserComponent - Login status:', userLoginOn);
    });

    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
      }
    );

    this.loginService.userData.subscribe((userData) => {
      if (userData) {
        this.userData = userData;
        this.changeDetectorRef.detectChanges(); // Forzar la detección de cambios
        console.log('UserComponent - User data:', userData);
      } else {
        console.log('User data is null');
      }
    });
  }

  onCategoryClick(category: Category): void {
    // Aquí cambiamos el EventEmitter por el método selectCategory del servicio
    this.categoryService.selectCategory(category);
  }
}
  
  
  
  
