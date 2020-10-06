import { Usuario } from './usuario.interface';

export interface RespuestaReportes {
  ok: boolean;
  reportesDb: Reporte[];
}

export interface RespuestaReporte {
    ok: boolean;
    reporteDb: Reporte;
}

export interface Reporte {
    usuario: Usuario;
    turno: string;
    _id?: string;
    activo?: boolean;
    estaEliminado?: boolean;
    fecha?: string;
    __v?: number;
}
