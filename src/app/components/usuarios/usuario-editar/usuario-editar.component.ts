import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../interfaces/usuario.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {

  public usuarioForm: FormGroup;

  public roles = [
    {
      valor: 'ADMIN_ROLE',
      descripcion: 'Administrador'
    },
    {
      valor: 'USER_ROLE',
      descripcion: 'Usuario'
    }
  ];

  constructor( public dialogRef: MatDialogRef<UsuarioEditarComponent>,
               @Inject(MAT_DIALOG_DATA) public usuario: Usuario,
               private fb: FormBuilder,
               private usuariosService: UsuariosService ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required, Validators.minLength(3)], []],
      apellido: [this.usuario.apellido, [Validators.required, Validators.minLength(3)], []],
      email: [this.usuario.email, [Validators.required, Validators.email], []],
      dni: [this.usuario.dni, [Validators.required, Validators.minLength(8)], []],
      rol: [this.usuario.rol, [Validators.required], []]
    });
  }

  actualizarUsuario(){
    if (this.usuarioForm.invalid){
      return;
    }

    const nombre = this.usuarioForm.get('nombre').value;
    const apellido = this.usuarioForm.get('apellido').value;
    const email = this.usuarioForm.get('email').value;
    const dni = this.usuarioForm.get('dni').value;
    const rol = this.usuarioForm.get('rol').value;

    this.usuariosService.editUsuario(this.usuario._id, nombre, apellido, email, rol, dni).subscribe( resp => {
      this.dialogRef.close(resp);
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

}
