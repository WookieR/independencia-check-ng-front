import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.css']
})
export class UsuarioNuevoComponent implements OnInit {

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

  constructor( public dialogRef: MatDialogRef<UsuarioNuevoComponent>,
               private fb: FormBuilder,
               private usuariosService: UsuariosService ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)], []],
      apellido: ['', [Validators.required, Validators.minLength(3)], []],
      dni: ['', [Validators.required, Validators.minLength(8)], []],
      email: ['', [Validators.required, Validators.email], []],
      password: ['', [Validators.required], []],
      rol: ['', [Validators.required], []]
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

  crearUsuario(){
    if (this.usuarioForm.invalid){
      return;
    }

    const nombre = this.usuarioForm.get('nombre').value;
    const apellido = this.usuarioForm.get('apellido').value;
    const dni = this.usuarioForm.get('dni').value;
    const email = this.usuarioForm.get('email').value;
    const password = this.usuarioForm.get('password').value;
    const rol = this.usuarioForm.get('rol').value;

    this.usuariosService.newUsuario(nombre, apellido, dni, email, password, rol).subscribe( resp => {
      this.dialogRef.close(resp);
    });
  }

}
