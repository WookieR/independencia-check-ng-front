export interface Usuario {
    nombre: string;
    apellido: string;
    email: string;
    dni: string;
    rol: string;
    _id?: string;
    estado?: boolean;
    __v?: number;
}

export interface RespuestaUsuarios {
  ok: boolean;
  usuarios: Usuario[];
  cuantos: number;
}

export interface RespuestaUsuario {
  ok: boolean;
  usuario: Usuario;
}
