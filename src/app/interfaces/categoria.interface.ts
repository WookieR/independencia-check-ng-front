export interface RespuestaCategorias {
  ok: boolean;
  categoriasDb: Categoria[];
}

export interface RespuestaCategoria {
    ok: boolean;
    categoriaDb: Categoria;
  }

export interface Categoria {
  estaEliminado?: boolean;
  _id?: string;
  descripcion: string;
  __v?: number;
}
