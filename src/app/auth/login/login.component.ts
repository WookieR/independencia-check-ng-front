import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userForm: FormGroup;

  public usuario: Usuario;

  constructor( private fb: FormBuilder,
               private authService: AuthService ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], []],
      password: ['', [Validators.required]]
    });
  }

  login(){
    if (this.userForm.invalid){
      return;
    }

    this.authService.login( this.userForm.value ).subscribe( resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }

  validarToken(){
    // SEGUIR AQUI
    // VALIDAR TOKEN Y IMPLEMENTAR GUARD
  }

}
