import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Maquina, RespuestaMaquina, RespuestaMaquinas } from '../interfaces/maquina.interface';
import { Observable } from 'rxjs';
import { RespuestaImagenMaquina } from '../interfaces/imagen.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MaquinasService {

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

  getMaquinas(): Observable<Maquina[]>{
    return this.http.get(`${base_url}/maquina`, this.headers).pipe(
      map( (resp: RespuestaMaquinas) => {
        return resp.maquinasDb;
      })
    );
  }

  newMaquina(nombre: string){
    return this.http.post(`${base_url}/maquina`, { nombre }, this.headers).pipe(
      map( (resp: RespuestaMaquina) => {
        return resp.maquinaDb;
      })
    );
  }

  editMaquina(maquina: Maquina){
    return this.http.put(`${base_url}/maquina/${ maquina._id }`, {nombre: maquina.nombre}, this.headers ).pipe(
      map( (resp: RespuestaMaquina) => {
        return resp.maquinaDb;
      })
    );
  }

  deleteMaquina(maquina: Maquina){
    return this.http.delete(`${base_url}/maquina/${maquina._id}`, this.headers).pipe(
      map( (resp:RespuestaMaquina) => {
        return resp.maquinaDb;
      })
    );
  }

  asignarImagen( idMaquina: string, imagen: File ){
    const fd = new FormData();
    fd.append('archivo', imagen, imagen.name);

    return this.http.put(`${base_url}/upload/maquina/${idMaquina}`, fd, this.headers).pipe(
      map( (resp: RespuestaImagenMaquina) => {
        return resp.maquinaGuardada;
      })
    );
  }

}
