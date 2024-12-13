import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component'; // Importa el componente Usuarios
import { ImagenesComponent } from './imagenes/imagenes.component'; // Importa el componente Imagenes

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent, // Ruta para usuarios
  },
  {
    path: 'imagenes',
    component: ImagenesComponent, // Ruta para imágenes
  },
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
