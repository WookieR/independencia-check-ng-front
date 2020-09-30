import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../interfaces/usuario.interface';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-usuario-borrar',
  templateUrl: './usuario-borrar.component.html',
  styleUrls: ['./usuario-borrar.component.css']
})
export class UsuarioBorrarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UsuarioBorrarComponent>,
              @Inject(MAT_DIALOG_DATA) public usuario: Usuario,
              private usuariosService: UsuariosService) { }

  ngOnInit(): void {
  }

  eliminarUsuario(){
    this.usuariosService.deleteUsuario(this.usuario).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

}
