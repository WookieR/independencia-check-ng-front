import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { RespuestaSectores, Sector, RespuestaSector } from '../interfaces/sector.interface';
import { RespuestaImagenSector } from '../interfaces/imagen.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SectoresService {

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

  getSectores(maquinaId?: string){
    return this.http.get(`${base_url}/sector`, this.headers).pipe(
      map((resp: RespuestaSectores) => {
        return resp.sectoresDb;
      })
    );
  }

  newSector(nombre: string, maquina: string){
    const sectorCrear = {
      nombre,
      maquina
    };
    return this.http.post(`${base_url}/Sector`, sectorCrear, this.headers).pipe(
      map( (resp: RespuestaSector) => {
        return resp.sectorDb;
      })
    );
  }

  editSector(sectorId: string, sectorNombre: string, sectorMaquinaId: string){

    const sectorActualizar = {
      nombre: sectorNombre,
      maquina: sectorMaquinaId
    };

    return this.http.put(`${base_url}/sector/${ sectorId }`, sectorActualizar, this.headers ).pipe(
      map( (resp: RespuestaSector) => {
        return resp.sectorDb;
      })
    );
  }

  deleteSector(sector: Sector){
    return this.http.delete(`${base_url}/sector/${sector._id}`, this.headers).pipe(
      map( (resp: RespuestaSector) => {
        return resp.sectorDb;
      })
    )
  }

  asignarImagen( idSector: string, imagen: File ){
    const fd = new FormData();
    fd.append('archivo', imagen, imagen.name);

    return this.http.put(`${base_url}/upload/sector/${idSector}`, fd, this.headers).pipe(
      map( (resp: RespuestaImagenSector) => {
        return resp.sectorGuardado;
      })
    );
  }
}
