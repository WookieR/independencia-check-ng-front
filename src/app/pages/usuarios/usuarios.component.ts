import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioNuevoComponent } from '../../components/usuarios/usuario-nuevo/usuario-nuevo.component';
import { UsuarioEditarComponent } from '../../components/usuarios/usuario-editar/usuario-editar.component';
import { UsuarioBorrarComponent } from '../../components/usuarios/usuario-borrar/usuario-borrar.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[];

  public cargando: boolean;

  constructor( private usuariosService: UsuariosService, public authService: AuthService, public dialog: MatDialog ) {
    this.cargando = true;
  }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe( resp => {
      this.cargando = false;
      this.usuarios = resp;
    });
  }

  nuevoUsuario(){
    const dialogRef = this.dialog.open(UsuarioNuevoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (!resp){
        return;
      }

      this.usuarios.push(resp);
    });
  }

  editarUsuario(usuario: Usuario){
    const dialogRef = this.dialog.open(UsuarioEditarComponent, {
      width: '400px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe((resp: Usuario) => {
      if (!resp){
        return;
      }


      // this.obtenerSectores();
      const index = this.usuarios.findIndex( usuario => usuario._id === resp._id);

      this.usuarios[index] = resp;

    });
  }

  borrarUsuario(usuario: Usuario){
    const dialogRef = this.dialog.open(UsuarioBorrarComponent, {
      width: '400px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe((resp: Usuario) => {
      if (!resp){
        return;
      }

      const index = this.usuarios.findIndex( item => item._id === resp._id);

      this.usuarios.splice(index, 1);

    });
  }

}
