import { Reporte } from './reporte.interface';
export interface RespuestaReporteMedidas {
    ok: boolean;
    reporte: Reporte;
    reporteDetalle: ReporteMaquina[];
}

export interface ReporteMaquina {
    nombre: string;
    sectores: ReporteSector[];
    _id?: string;
    estaEliminado?: boolean;
    __v?: number;
    img?: string;
}

export interface ReporteSector {
    nombre: string;
    items: ReporteItem[];
    _id?: string;
    estaEliminado?: boolean;
    maquina?: string;
    __v?: number;
    img?: string;
}

export interface ReporteItem {
    nombre: string;
    medidas: ReporteMedida[];
    _id?: string;
    estaEliminado?: boolean;
    sector?: string;
    __v?: number;
}

export interface ReporteMedida {
    valor: string;
    _id?: string;
    reporte?: string;
    itemCategoria?: ItemCategoria;
    __v?: number;
}

export interface ItemCategoria {
    nombre: string;
    descripcion: string;
    categoria: Categoria;
    _id?: string;
    estaEliminado?: boolean;
    item?: string;
    __v?: number;
}

export interface Categoria {
  _id?: string;
  estaEliminado?: boolean;
  descripcion: string;
  __v?: number;
}
