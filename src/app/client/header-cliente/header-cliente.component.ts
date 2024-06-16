import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router }  from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';
import { DialogComponent } from '../dialog-error/dialog.component';
import { ProductComponent } from '../../client/product/product.component';
import { LoginService } from '../../services/auth/auth.service';
import { CategoryService } from '../../services/features/category.service';
import { Category } from '../../interface/Category';
import { usuario } from '../../interface/user';
import { UsuarioService } from '../../services/auth/users.service';

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [CommonModule,ProductComponent, RouterModule, DialogSuccessComponent, DialogComponent],
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
    private router: Router,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
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
    
    this.categoryService.selectCategory(category);
  }

  logout(): void {
    this.loginService.logout();
    this.changeDetectorRef.detectChanges(); 
  this.router.navigate(['']).then(() => {
    window.location.reload(); // 
  });

  }


  eliminar(id?: number): void {
    if (id) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => {
          console.log('Usuario eliminado con éxito');
          this.showSuccesModal('Hasta pronto! Nos volveremos a ver ...'); 
          // this.router.navigate(['/']).then(() => {
          //   window.location.reload();
          // });
        },
        error: (error) => {
          this.showErrorModal('Tienes pedidos "Pendientes" o en proceso de "Entrega".');
          console.error('Hubo un error al eliminar el usuario', error); //no se podra eliminar en caso de que Tenga un pedido pendiente de envio o entregado
        }
      });
    } else {
      console.error('El ID del usuario no está disponible'); // En este caso seria utilizado si se elimina introduciendo el id manualmente
    }
  }


  showErrorModal(message: string): void {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se ha cerrado'); // despues de que se cierre el modal algo se puede hacer....
    });
  }


  showSuccesModal(message: string): void {
    const dialogRef: MatDialogRef<DialogSuccessComponent> = this.dialog.open(DialogSuccessComponent, {
      data: { message: message }
    });

    setTimeout(() => {
      dialogRef.close();
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }, 5000);

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se ha cerrado');
     
    });
  }

  editarMisDatos(id?: number): void {
    this.router.navigate(['app-user/editar-datos', id]);
  }


}

  
  
  
