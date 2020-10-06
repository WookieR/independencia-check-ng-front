import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { RespuestaReporte, RespuestaReportes } from '../interfaces/reporte.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

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

  getReportes(){
    return this.http.get(`${base_url}/reporte`, this.headers).pipe(
      map( (resp: RespuestaReportes) => {
        return resp.reportesDb;
      })
    );
  }

  newReporte(usuario: string, turno: string){
    const data = {
      usuario, turno
    };

    return this.http.post(`${base_url}/reporte`, data, this.headers).pipe(
      map ( (resp: RespuestaReporte) => {
        return resp.reporteDb;
      })
    );
  }

  editReporte(reporteId: string, estado: boolean = false){
    return this.http.put(`${base_url}/reporte/${reporteId}/${estado}`, estado, this.headers).pipe(
      map ( (resp: RespuestaReporte) => {
        return resp.reporteDb;
      })
    );
  }
}
