import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from '../../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8081/api/usuario'; 

  constructor(private http: HttpClient) {}

  obtenerTodosLosUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  actualizarUsuario(id: number, usuario: usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);
  }



}
