import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { RespuestaUsuario, RespuestaUsuarios, Usuario } from '../interfaces/usuario.interface';
import { map } from 'rxjs/operators';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  get token(){
    return localStorage.getItem('token');
  }

  get headers(){

    const headers = {
      headers: {
        'token': this.token
      }
    };
    return headers;
  }

  constructor( private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(`${base_url}/usuario`, this.headers).pipe(
      map( (resp: RespuestaUsuarios) => {
        return resp.usuarios;
      })
    );
  }

  newUsuario(nombre: string, apellido: string, dni: string, email: string, password: string, rol: 'ADMIN_ROLE' | 'USER_ROLE'){
    const data = {
      nombre,
      apellido,
      dni,
      email,
      password,
      rol
    };

    return this.http.post(`${base_url}/usuario`, data, this.headers).pipe(
      map( (resp: RespuestaUsuario) => {
        return resp.usuario;
      })
    );
  }

  editUsuario( usuarioId: string, nombre: string, apellido: string, email: string, rol: 'ADMIN_ROLE' | 'USER_ROLE', dni: string){
    const data = {
      nombre,
      apellido,
      email,
      dni,
      rol
    };

    return this.http.put(`${base_url}/usuario/${usuarioId}`, data, this.headers).pipe(
      map( (resp: RespuestaUsuario) => {
        return resp.usuario;
      })
    );
  }

  deleteUsuario( usuario: Usuario ){
    return this.http.delete(`${base_url}/usuario/${usuario._id}`, this.headers).pipe(
      map( (resp: RespuestaUsuario) => {
        return resp.usuario;
      })
    );
  }
}
