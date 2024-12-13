import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';  // Importa FormsModule

import { UsuariosComponent } from './usuarios/usuarios.component'; // Importa el componente
import { ImagenesComponent } from './imagenes/imagenes.component'; // Importa ImagenesComponent

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    ImagenesComponent  // Asegúrate de agregar ImagenesComponent aquí
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, 
    HttpClientModule, 
    FormsModule // Asegúrate de que FormsModule esté aquí
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
