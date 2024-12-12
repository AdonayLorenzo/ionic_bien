import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  usuarios: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsuarios();
  }

  fetchUsuarios() {
    this.http.get<any[]>('https://mi-api.com/usuarios') // Cambia por tu URL
      .subscribe(data => {
        this.usuarios = data;
      });
  }

  deleteUsuario(id: number) {
    this.http.delete(`https://mi-api.com/usuarios/${id}`) // Cambia por tu URL
      .subscribe(() => {
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
      });
  }
}

