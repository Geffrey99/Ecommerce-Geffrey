import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { Observable, tap, throwError, catchError, BehaviorSubject } from 'rxjs';
import { usuario } from './user';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
// inicialmente no va a estar logueado
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  currentUserData: BehaviorSubject<usuario> = new BehaviorSubject<usuario>({nombre: '', apellido: '', email: '', password: ''});

  constructor(private http: HttpClient) { }
  
  login(credentials: LoginRequest):Observable<any>{
    console.log('1 servicio');
    console.log(credentials);
 
    return this.http.post<any>('http://localhost:8081/login', credentials).pipe(
      tap ((userData) => {
        console.log('2servicio');
        console.log(userData);
        // this.currentUserData.next(n); // Emitir null primero para indicar que se está cargando
        this.currentUserData.next(userData); // Luego emitir el usuario autenticado
        this.currentUserLoginOn.next(true);
  }),
  catchError(this.handleError)
    );
}

private handleError(error:HttpErrorResponse)  {
if (error.status===0) {
  console.error('Se ha producido un error:', error.error);

}else {
  console.error(
    `Backend devolvió el código ${error.status}, ` +
    `cuerpo del error: ${error.error}`);
}
return throwError(() => new Error('Error de conexión'));
}


get userData(): Observable<usuario> {
  return this.currentUserData.asObservable();
}

get userLoginOn(): Observable<boolean>{
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


}