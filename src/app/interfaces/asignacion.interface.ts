import { Categoria } from './categoria.interface';
import { Item } from './item.interface';

export interface RespuestaAsignaciones {
  ok: boolean;
  itemCategoriasDb: Asignacion[];
}

export interface RespuestaAsignacion {
    ok: boolean;
    itemCategoriaDb: Asignacion;
  }

export interface Asignacion {
    _id?: string;
    estaEliminado?: boolean;
    nombre: string;
    descripcion: string;
    item: Item;
    categoria: Categoria;
    __v: number;
}
