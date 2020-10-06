import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { RespuestaReporteMedidas } from '../interfaces/reporte-medidas.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReporteMedidasService {

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

  constructor(private http: HttpClient) { }

  getReporteMedidas(reporteId: string){
    return this.http.get(`${base_url}/reporte-medida/reporte/${reporteId}`, this.headers).pipe(
      map( (resp: RespuestaReporteMedidas) => {
        return resp.reporteDetalle;
      })
    );
  }
}
