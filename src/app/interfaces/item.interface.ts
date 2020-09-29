import { Sector } from './sector.interface';

export interface RespuestaItems {
  ok: boolean;
  itemsDb: Item[];
}

export interface RespuestaItem {
    ok: boolean;
    itemDb: Item;
  }

export interface Item {
  estaEliminado: boolean;
  _id: string;
  nombre: string;
  sector: Sector;
  __v: number;
}
