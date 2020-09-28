import { Maquina } from './maquina.interface';

export interface RespuestaSectores {
  ok: boolean;
  sectoresDb: Sector[];
}

export interface RespuestaSector {
  ok: boolean;
  sectorDb: Sector;
}

export interface Sector {
    nombre: string;
    maquina: Maquina;
    estaEliminado?: boolean;
    _id?: string;
    __v?: number;
    img?: string;
}
