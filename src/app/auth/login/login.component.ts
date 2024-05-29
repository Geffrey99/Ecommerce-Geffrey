import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { LoginService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { HttpClientModule } from '@angular/common/http';
import { usuario } from '../../services/auth/user';
import { UserComponent } from '../../user/user.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, UserComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
loginError:string="";
isRightPanelActive: boolean = false; 
userLoginOn: boolean = false;
userData?: usuario;
  constructor(private formBuilder: FormBuilder, private loginservice: LoginService, private router: Router ) {}

  ngOnInit(): void {
  
  }

  loginForm=this.formBuilder.group({
    email: ['zambrano@gmail.com', [Validators.required, Validators.email]],
    password: ['2070gz', Validators.required]
  });

  registerForm=this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  
  });

get email() {
  return this.loginForm.controls.email;
}

get password() {
  return this.loginForm.controls.password;
}

login(): void {
  if (this.loginForm.valid) {
    this.loginservice.login(this.loginForm.value as LoginRequest).subscribe({
      next: (response) => {
        const userData = response.usuario;
        const userRole = userData.rol; // Asume que el rol viene dentro del objeto usuario
        console.log('LoginComponent - Data received:', userData);

        // Redirigir basado en el rol del usuario
        if (userRole === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/app-user']);
        }

        this.loginForm.reset();
      },
      error: (errorData) => {
        console.error(errorData);
        this.loginError = errorData.message || 'Error al iniciar sesión';
      },
      complete: () => {
        console.info('Login Completado con exito');
      }
    });
  } else {
    this.loginForm.markAllAsTouched();
    alert("Formulario inválido");
  }
}


// register(): void {
//   if (this.registerForm.valid) {
//     this.loginservice.registerContacto(this.registerForm.value as usuario).subscribe({

//       next: (userData) => {
//         console.log('3 componente ');
//         console.log(userData); 
       
//       },
//       error: (errorData)  => {
//         console.error(errorData);
//         this.loginError = errorData;
//       },
//       complete: ()  => {
//         console.info('Registro completado con exito');
//         this.router.navigateByUrl('app-user');
//         this.registerForm.reset();
//       }
//     })
//   } else {
//     this.registerForm.markAllAsTouched();
//     alert("Formulario inválido");
//   }



// }
register(): void {
  if (this.registerForm.valid) {
      this.loginservice.registerContacto(this.registerForm.value as usuario).subscribe({
          next: (userData) => {
              console.log('Registro exitoso', userData);
              this.router.navigateByUrl('app-user'); // Mover esta línea aquí
              this.registerForm.reset();
          },
          error: (errorData) => {
              console.error('Error en el registro', errorData);
              this.loginError = errorData;
              // Mostrar mensaje de error al usuario aquí
          }
      });
  } else {
      this.registerForm.markAllAsTouched();
      alert("Formulario inválido");
  }
}
togglePanel(isSignUp: boolean): void {
  this.isRightPanelActive = isSignUp;
}
  
}