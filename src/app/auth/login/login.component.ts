import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userForm: FormGroup;

  public cargando: boolean;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) {


    this.cargando = false;

  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], []],
      password: ['', [Validators.required]]
    });

  }

  login(): void{
    if (this.userForm.invalid){
      return;
    }

    this.cargando = true;

    this.authService.login( this.userForm.value ).subscribe( resp => {
      this.cargando = false;
      this.router.navigateByUrl('/dashboard');
    }, err => {
      this.cargando = false;
      Swal.fire('Error al ingresar', err.error.message, 'error');
    });
  }

}
