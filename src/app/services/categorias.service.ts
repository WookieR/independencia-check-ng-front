import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { RespuestaCategoria, RespuestaCategorias, Categoria } from '../interfaces/categoria.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

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

  getCategorias(){
    return this.http.get(`${base_url}/categoria`, this.headers).pipe(
      map( (resp: RespuestaCategorias) => {
        return resp.categoriasDb;
      })
    );
  }

  newCategoria(descripcion: string){
    return this.http.post(`${base_url}/categoria`, {descripcion}, this.headers).pipe(
      map( (resp: RespuestaCategoria) => {
        return resp.categoriaDb;
      })
    );
  }

  editCategoria(categoriaId: string, descripcion: string){
    return this.http.put(`${base_url}/categoria/${categoriaId}`, {descripcion}, this.headers).pipe(
      map( (resp: RespuestaCategoria) => {
        return resp.categoriaDb;
      })
    );
  }

  deleteCategoria(categoria: Categoria){
    return this.http.delete(`${base_url}/categoria/${categoria._id}`, this.headers).pipe(
      map( (resp: RespuestaCategoria) => {
        return resp.categoriaDb;
      })
    );
  }
}
