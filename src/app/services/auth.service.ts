import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario.interface';
import { of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public Usuario: Usuario;

  get adminRole(): boolean{
    if( this.Usuario.rol === 'ADMIN_ROLE'){
      return true;
    }else{
      return false;
    }
  }

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

  constructor( private http: HttpClient ) { }

  login(formData: FormData){
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  validarToken(){
    return this.http.get(`${base_url}/renew`, this.headers).pipe(
      map( (resp:any) => {
        this.Usuario = resp.usuario;
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError ( err => of(false) )
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.Usuario = null;
  }
}
