import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { RespuestaAsignaciones, RespuestaAsignacion, Asignacion } from '../interfaces/asignacion.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {

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

  getAsignaciones(){
    return this.http.get(`${base_url}/item-categoria`, this.headers).pipe(
      map( (resp: RespuestaAsignaciones) => {
        return resp.itemCategoriasDb;
      })
    );
  }

  newAsignacion(nombre: string, descripcion: string, item: string, categoria: string){
    const data = { nombre, descripcion, item, categoria };

    return this.http.post(`${base_url}/item-categoria`, data, this.headers).pipe(
      map( (resp: RespuestaAsignacion) => {
        return resp.itemCategoriaDb;
      })
    );
  }

  editAsignacion(asignacionId: string, nombre: string, descripcion: string, item: string, categoria: string){
    const data = { nombre, descripcion, item, categoria};

    return this.http.put(`${base_url}/item-categoria/${asignacionId}`, data, this.headers).pipe(
      map( (resp: RespuestaAsignacion) => {
        return resp.itemCategoriaDb;
      })
    );
  }

  deleteAsignacion(asignacion: Asignacion){
    return this.http.delete(`${base_url}/item-categoria/${asignacion._id}`, this.headers).pipe(
      map( (resp: RespuestaAsignacion) => {
        return resp.itemCategoriaDb;
      })
    );
  }
}
