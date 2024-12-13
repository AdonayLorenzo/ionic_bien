import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo Usuario (ya definido en tu código)
export interface Usuario {
  id?: number; // ID opcional
  nickname: string;
  email: string;
  password: string;
  birthdate: string;
}

// Modelo Imagen
export interface Imagen {
  id?: number; // ID opcional
  biografia: string;
  fechaSubida: string;
  datos: string; // Base64 string o URL de la imagen
  usuario: Usuario; // Relación con el usuario
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/api/usuarios'; // Base URL para usuarios
  private imagenesUrl = 'http://localhost:8080/api/imagenes'; // Base URL para imágenes

  constructor(private http: HttpClient) {}

  // Métodos para Usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  checkIfExists(nickname: string, email: string): Observable<{ nicknameExists: boolean; emailExists: boolean }> {
    const params = { nickname, email };
    return this.http.get<{ nicknameExists: boolean; emailExists: boolean }>(`${this.baseUrl}/exists`, { params });
  }

  // Métodos para Imágenes

  // Obtener todas las imágenes
  getImagenes(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.imagenesUrl);
  }

  // Subir una imagen
  createImagen(data: FormData): Observable<Imagen> {
    return this.http.post<Imagen>(`${this.imagenesUrl}/upload`, data);
  }

  // Eliminar una imagen
  deleteImagen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.imagenesUrl}/${id}`);
  }

  // Actualizar una imagen
  updateImagen(id: number, data: FormData): Observable<Imagen> {
    return this.http.put<Imagen>(`${this.imagenesUrl}/update/${id}`, data);
  }
}
