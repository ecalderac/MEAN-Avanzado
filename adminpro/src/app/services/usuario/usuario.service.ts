import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService 
  ) {
    this.cargarStorage();
   }

   estaLogueado(){
     return( this.token.length > 5) ? true : false
   }

   cargarStorage(){
      if(localStorage.getItem('token')){

          this.token = localStorage.getItem('token');
          this.usuario = JSON.parse(localStorage.getItem('usuario'));
          this.menu = JSON.parse( localStorage.getItem('menu') );
      }else{
          this.token = '';
          this.usuario = null;
          this.menu = [];
      }
   }

   guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['./login']);
  }

   loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
                .pipe(map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
                  console.log(resp);
                  return true;
                }));

  }

   login( usuario: Usuario, recordar: boolean = false  ){

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                .pipe(map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
                  console.log(resp);
                  return true;
                }))
                .catch(err => {
                  Swal.fire( 'Error en el login', err.error.mensaje, 'error' );
                  return Observable.throw( err );
                });

   }


   crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
                .pipe(map((resp: any) => {

                  Swal.fire('Usuario creado', usuario.email, 'success');
                  return resp.usuario;

                })).catch(err => {
                  Swal.fire( err.error.mensaje, err.error.errors.message, 'error' );
                  return Observable.throw( err );
                });

    }

    actualizarUsuario(usuario: Usuario){

      let url = URL_SERVICIOS + '/usuario/' + usuario._id;
      url += '?token=' + this.token;

      return this.http.put(url, usuario)
                  .pipe(map( (resp: any) => {

                    //si el usuario q viene en la peticion es el mismo al que esta logueado 
                    if(usuario._id === this.usuario._id){
                      let usuarioDB: Usuario = resp.usuario;
                      this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
                    }

                    Swal.fire('Usuario actualizado', usuario.nombre, 'success');

                    return true;
                  }))
                  .catch(err => {
                    Swal.fire( err.error.mensaje, err.error.errors.message, 'error' );
                    return Observable.throw( err );
                  });

    }

    cambiarImagen(archivo: File, id: string){

      this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
            .then((resp: any) => {
              // console.log(resp);
              this.usuario.img = resp.usuario.img;
              Swal.fire('Imagen de usuario actualizada', this.usuario.nombre, 'success');
              this.guardarStorage(id, this.token, this.usuario, this.menu);
            })
            .catch( resp => {
              console.log(resp);
            });

    }

    cargarUsuarios(desde: number = 0){

      let url = URL_SERVICIOS + '/usuario?desde=' + desde;
      url += '&token=' + this.token;
      return this.http.get(url);

    }

    buscarUsuarios(termino: string){

      let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
      return this.http.get(url)
                  .pipe(map( (resp: any) => resp.usuarios));

    }

    borrarUsuario(id: string){
      let url = URL_SERVICIOS + '/usuario/' + id;
      url += '?token=' + this.token;
      return this.http.delete(url)
                  .pipe(map( resp => {
                    Swal.fire('Eliminado!', 'El usuario ha sido eliminado corectamente','success');
                    return true;
                  }));
                  
                    
    }

}
