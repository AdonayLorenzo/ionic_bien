import { Component } from '@angular/core';
import { UsuarioService, Imagen, Usuario } from '../services/usuario.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss'],
})
export class ImagenesComponent {
  imagenes: Imagen[] = [];
  usuarios: Usuario[] = [];
  selectedFile: File | null = null;
  selectedUsuarioId: number | null = null;
  biografia: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  imagenToUpdate: Imagen | null = null;  // Variable para la imagen seleccionada para actualizar

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.getImagenes();
    this.getUsuarios();
  }

  // Cargar la lista de imágenes
  getImagenes() {
    this.usuarioService.getImagenes().subscribe(
      (imagenes) => {
        this.imagenes = imagenes;
      },
      (error) => {
        this.errorMessage = 'Hubo un error al cargar las imágenes';
      }
    );
  }

  // Cargar la lista de usuarios
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

  // Seleccionar archivo
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  // Subir imagen
  uploadImagen() {
    if (!this.selectedFile || !this.selectedUsuarioId) {
      this.errorMessage = 'Por favor selecciona un archivo e identifica un usuario';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('biografia', this.biografia);
    formData.append('idUsuario', this.selectedUsuarioId.toString());

    this.usuarioService.createImagen(formData).subscribe(
      (imagen) => {
        this.successMessage = 'Imagen subida exitosamente';
        this.getImagenes();
        this.clearForm();
      },
      (error) => {
        this.errorMessage = 'Hubo un error al subir la imagen';
        this.getImagenes();
      }
    );
  }

  // Eliminar imagen
  deleteImagen(id: number) {
    this.usuarioService.deleteImagen(id).subscribe(
      () => {
        this.successMessage = 'Imagen eliminada exitosamente';
        this.getImagenes();
      },
      (error) => {
        this.errorMessage = 'Hubo un error al eliminar la imagen';
      }
    );
  }

  // Preparar imagen para actualización
  editImagen(imagen: Imagen) {
    this.imagenToUpdate = imagen;
    this.biografia = imagen.biografia; // Cargar biografía actual
    // Establecer el usuario y la imagen a editar si es necesario
  }

  // Actualizar imagen
  updateImagen() {
    // Verificar si la biografía está definida
    if (!this.imagenToUpdate || !this.biografia) {
      this.errorMessage = 'Por favor ingresa una biografía para actualizar.';
      return;
    }
  
    // Crear un nuevo FormData solo con la biografía
    const formData = new FormData();
    formData.append('biografia', this.biografia);
  
    // Solo actualizamos si la imagen a actualizar tiene un ID
    if (this.imagenToUpdate?.id) {
      // Llamar al servicio para actualizar la imagen con la biografía
      this.usuarioService.updateImagen(this.imagenToUpdate.id, formData).subscribe(
        (imagenActualizada) => {
          // Manejo del éxito: puedes actualizar la vista o mostrar un mensaje
          console.log('Imagen actualizada:', imagenActualizada);
          this.getImagenes();
          this.clearForm();
        },
        (error) => {
          // Manejo del error: puedes mostrar un mensaje de error
          console.error('Error al actualizar la imagen:', error);
        }
      );
    } else {
      console.error('ID de la imagen no está definido');
      // Manejo del error: puedes mostrar un mensaje al usuario
      this.errorMessage = 'ID de la imagen no está definido';
    }
  }
  

  // Limpiar formulario
  clearForm() {
    this.selectedFile = null;
    this.selectedUsuarioId = null;
    this.biografia = '';
    this.imagenToUpdate = null; // Limpiar la imagen seleccionada para actualizar
  }
}
