import { Maquina } from './maquina.interface';

export interface RespuestaImagenMaquina {
  ok: boolean;
  maquinaGuardada: Maquina;
  img: string;
}
