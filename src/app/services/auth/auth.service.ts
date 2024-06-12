import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../interface/loginRequest';
import { Observable, throwError, catchError, BehaviorSubject, tap } from 'rxjs';
import { usuario } from '../../interface/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<usuario | null> = new BehaviorSubject<usuario | null>(null);

  private authToken: string | null = null;


  // constructor(private http: HttpClient) {
  //   if (typeof window !== 'undefined') {
  //   const user = localStorage.getItem('user');
  //   const userRole = localStorage.getItem('userRole');
  //   const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
  //   if (user && userRole && isUserLoggedIn) {
  //     this.setCurrentUser(JSON.parse(user));
  //   }
  // }
  // }

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      this.setCurrentUser(JSON.parse(user), token);
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8081/login', credentials).pipe(
      tap((response) => {
        this.setCurrentUser(response.usuario, response.token);
      }),
      catchError(this.handleError)
    );
  }

  private setCurrentUser(userData: usuario, token: string): void {
    this.currentUserData.next(userData);
    this.currentUserLoginOn.next(true);
    this.authToken = token;
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  }

  logout(): void {
    this.currentUserLoginOn.next(false);
    this.currentUserData.next(null);
    this.authToken = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }


  // login(credentials: LoginRequest): Observable<any> { // Cambia el tipo de retorno a 'any' para incluir el rol
  //   return this.http.post<any>('http://localhost:8081/login', credentials).pipe(
  //     tap((response) => {
  //       const userData = response.usuario;
  //       const userRole = userData.rol; 
  //       // delete userData.contraseña; // Eliminar la contraseña de userData
  //       this.setCurrentUser(userData);
  //       localStorage.setItem('user', JSON.stringify(userData));
  //       localStorage.setItem('userRole', userRole); 
  //       localStorage.setItem('isUserLoggedIn', 'true');
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  // setCurrentUser(userData: usuario): void {
  //   this.currentUserData.next(userData);
  //   this.currentUserLoginOn.next(true);
  // }

  // logout(): void {
  //   this.currentUserLoginOn.next(false);
  //   this.currentUserData.next(null);
  // }


  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });
  }

  
  checkAuth(): boolean {
    return this.currentUserLoginOn.value;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error:', error.error);
    } else {
      console.error(
        `Backend devolvió el código ${error.status}, ` +
        `cuerpo del error: ${error.error}`);
    }
    return throwError(() => new Error('Error de conexión'));
  }

  get userData(): Observable<usuario | null> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }


registerContacto(usuario: usuario): Observable<any> {
  console.log(usuario);
  return this.http.post<usuario>('http://localhost:8081/api/usuario/register', usuario).pipe(
    tap((userData: usuario) => {
      this.currentUserData.next(userData);
      this.currentUserLoginOn.next(true);
    }),
    catchError(this.handleError)
  );
}

 // Ejemplo de cómo usar getAuthHeaders en una solicitud HTTP
 getUserProfile(): Observable<usuario> {
  return this.http.get<usuario>('http://localhost:8081/api/usuario/profile', {
    headers: this.getAuthHeaders()
  });
}



}