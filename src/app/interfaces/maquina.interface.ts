export interface RespuestaMaquinas {
  ok: boolean;
  maquinasDb: Maquina[];
}

export interface Maquina {
    nombre: string;
    estaEliminado: boolean;
    _id?: string;
    __v?: number;
    img?: string;
}

export interface RespuestaMaquina {
  ok: boolean;
  maquinaDb: Maquina;
}
