import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

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

    if(archivo.type.indexOf('image') < 0){
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

      this.imagenSubir = archivo;

      let reader = new FileReader();
      let urlImagenTemp = reader.readAsDataURL(archivo);

      reader.onloadend = () => this.imagenTemp = reader.result;
      

  }

  cambiarImagen(){

    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);

  }

}
