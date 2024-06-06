import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { usuario } from '../../interface/user';
import { LoginService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../client/product/product.component';
import { RouterModule } from '@angular/router';
import { Product } from '../../interface/Product';
import { CategoryService } from '../../services/features/category.service';
import { Category } from '../../interface/Category';

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
  
  
  
  
