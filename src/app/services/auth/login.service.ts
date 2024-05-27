import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { Observable, tap, throwError, catchError, BehaviorSubject } from 'rxjs';
import { usuario } from './user';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<usuario | null> = new BehaviorSubject<usuario | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<usuario> {
    return this.http.post<usuario>('http://localhost:8081/login', credentials).pipe(
      tap(userData => {
        console.log('LoginService - Data received:', userData);
        this.setCurrentUser(userData);
      }),
      catchError(this.handleError)
    );
  }

  setCurrentUser(userData: usuario): void {
    this.currentUserData.next(userData);
    console.log('LoginSereeeeeeee:', userData);
    this.currentUserLoginOn.next(true);
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


get userData(): Observable<usuario | null> {
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