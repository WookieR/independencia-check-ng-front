import { Maquina } from './maquina.interface';
import { Sector } from './sector.interface';

export interface RespuestaImagenSector {
  ok: boolean;
  sectorGuardado: Sector;
  img: string;
}

export interface RespuestaImagenMaquina {
  ok: boolean;
  maquinaGuardada: Maquina;
  img: string;
}
