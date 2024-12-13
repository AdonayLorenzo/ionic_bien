// usuarios.component.ts

import { Component } from '@angular/core';
import { UsuarioService , Usuario} from '../services/usuario.service';  // Asegúrate de que la importación esté correcta
  // Asegúrate de que el modelo Usuario esté bien definido

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];
  selectedUsuario: Usuario | null = null;
  newNickname: string = '';
  newEmail: string = '';
  newPassword: string = '';
  newBirthdate: string = '';
  
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.getUsuarios();
  }

  // Método para crear un nuevo usuario
  createUsuario() {
    const usuarioData = {
      nickname: this.newNickname,
      email: this.newEmail,
      password: this.newPassword,
      birthdate: this.newBirthdate,
    };

    this.usuarioService.createUsuario(usuarioData).subscribe(
      (response) => {
        this.successMessage = 'Usuario creado exitosamente';
        this.getUsuarios(); // Recargar la lista de usuarios
      },
      (error) => {
        this.errorMessage = 'Hubo un error al crear el usuario';
      }
    );
  }

  // Método para actualizar un usuario
  // usuarios.component.ts

  updateUsuario() {
    if (this.selectedUsuario && this.selectedUsuario.id !== undefined) {
      const updatedData = {
        nickname: this.newNickname,
        email: this.newEmail,
        password: this.newPassword,
        birthdate: this.newBirthdate,
      };
  
      // Pasa el id y los datos del usuario
      this.usuarioService.updateUsuario(this.selectedUsuario.id, updatedData).subscribe(
        (response) => {
          this.successMessage = 'Usuario actualizado exitosamente';
          this.getUsuarios(); // Recargar la lista de usuarios
          this.clearForm(); // Limpiar el formulario
        },
        (error) => {
          this.errorMessage = 'Hubo un error al actualizar el usuario';
        }
      );
    } else {
      this.errorMessage = 'El usuario seleccionado no tiene un ID válido';
    }
  }
  


  // Método para seleccionar un usuario para editar
  selectUsuario(usuario: Usuario) {
    this.selectedUsuario = usuario;
    this.newNickname = usuario.nickname;
    this.newEmail = usuario.email;
    this.newPassword = ''; // Opcional, no mostrar la contraseña al editar
    this.newBirthdate = usuario.birthdate;
  }

  // Método para eliminar un usuario
  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(
      () => {
        this.successMessage = 'Usuario eliminado exitosamente';
        this.getUsuarios(); // Recargar la lista de usuarios
      },
      (error) => {
        this.errorMessage = 'Hubo un error al eliminar el usuario';
      }
    );
  }

  // Método para limpiar el formulario
  clearForm() {
    this.selectedUsuario = null;
    this.newNickname = '';
    this.newEmail = '';
    this.newPassword = '';
    this.newBirthdate = '';
  }

  // Método para obtener la lista de usuarios
  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        this.errorMessage = 'Hubo un error al cargar los usuarios';
      }
    );
  }
}
