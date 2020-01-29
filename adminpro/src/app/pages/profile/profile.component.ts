import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario){
    // console.log(usuario );
    this.usuario.nombre = usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
                .subscribe();
  }

  seleccionImage(archivo: File){
    
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

      this.imagenSubir = archivo;

  }

  cambiarImagen(){

    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);

  }

}