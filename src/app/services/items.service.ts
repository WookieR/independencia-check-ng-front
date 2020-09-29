import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { RespuestaItems, RespuestaItem, Item } from '../interfaces/item.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

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

  getItems(){
    return this.http.get(`${base_url}/item`, this.headers).pipe(
      map( (resp: RespuestaItems) => {
        return resp.itemsDb;
      })
    );
  }

  newItem(nombre: string, sector: string){
    const itemCrear = {
      nombre,
      sector
    };
    return this.http.post(`${base_url}/item`, itemCrear, this.headers).pipe(
      map( (resp: RespuestaItem) => {
        return resp.itemDb;
      })
    );
  }

  editItem(itemId: string, nombre: string, sector: string){
    const itemModificar = {
      nombre,
      sector
    };

    return this.http.put(`${base_url}/item/${itemId}`, itemModificar, this.headers).pipe(
      map( (resp: RespuestaItem) => {
        return resp.itemDb;
      })
    );
  }

  deleteItem(item: Item){
    return this.http.delete(`${base_url}/item/${item._id}`, this.headers).pipe(
      map( (resp: RespuestaItem) => {
        return resp.itemDb;
      })
    );
  }
}
