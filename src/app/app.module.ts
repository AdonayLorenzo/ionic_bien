import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';  // Importa FormsModule

import { UsuariosComponent } from './usuarios/usuarios.component'; // Importa el componente

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent
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
