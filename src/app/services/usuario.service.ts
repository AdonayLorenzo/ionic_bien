import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definimos la interfaz Usuario aquí o la importamos desde un archivo separado
export interface Usuario {
  id?: number; // Hacer que `id` sea opcional
  nickname: string;
  email: string;
  password: string;
  birthdate: string;
}


export interface CreateUsuario {
  nickname: string;
  email: string;
  password: string;
  birthdate: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/api/usuarios'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  // Crear un nuevo usuario
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  // Actualizar un usuario existente
  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, usuario);
  }

  // Eliminar un usuario
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Verificar si un nickname o email ya existen en la base de datos
 // UsuarioService
checkIfExists(nickname: string, email: string): Observable<{ nicknameExists: boolean, emailExists: boolean }> {
  const params = { nickname, email };
  return this.http.get<{ nicknameExists: boolean, emailExists: boolean }>(`${this.baseUrl}/exists`, { params });
}

}



