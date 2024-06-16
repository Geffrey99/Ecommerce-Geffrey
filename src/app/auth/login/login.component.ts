import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import { LoginService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../interface/loginRequest';
import { usuario } from '../../interface/user';
import { ClientComponent } from '../../client/client.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, ClientComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
loginError:string="";
isRightPanelActive: boolean = false; 
userLoginOn: boolean = false;
userData?: usuario;
  changeDetectorRef: any;
  constructor(private formBuilder: FormBuilder, private loginservice: LoginService, private router: Router ) {}

  ngOnInit(): void {
  
  }

  loginForm=this.formBuilder.group({
    email: ['zambrano@gmail.com', [Validators.required, Validators.email]],
    password: ['geffrey11', Validators.required]
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
        const userRole = userData.rol; //  el rol viene dentro del objeto usuario
        console.log('LoginComponent - Data received:', userData);

        // REDIRIGOOOO BASADOOO en el rol del usuario
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



register(): void {
  if (this.registerForm.valid) {
    this.loginservice.registerContacto(this.registerForm.value as usuario).subscribe({
      next: (userData) => {
        console.log('Registro exitoso', userData);
        this.registerForm.reset();
 
        this.router.navigate(['']).then(() => {
             window.location.reload(); // 
                  });
      },
      error: (errorData) => {
        console.error('Error en el registro', errorData);
       
        this.showError(errorData);
      }
    });
  } else {
    this.registerForm.markAllAsTouched();
  
    this.showFormInvalidMessage();
  }
}


showError(errorData: any): void {
  // Implementa la lógica para mostrar el error
}

showFormInvalidMessage(): void {
  // Implementa la lógica para informar al usuario que el formulario es inválido
}



togglePanel(isSignUp: boolean): void {
  this.isRightPanelActive = isSignUp;
}
  
}