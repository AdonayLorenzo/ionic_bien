import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component'; // Importa el componente

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent // Aquí usa el nombre correcto del componente
  },
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
