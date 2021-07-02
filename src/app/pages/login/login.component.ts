import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {

    //Adiciona email/pass padrão para testes apenas qdo não é produção
    // if (environment.production) {
      this.formLogin = this.formBuilder.group({
        'email': [''],
        'pass': ['']
      });
    // } else {
    //   this.formLogin = this.formBuilder.group({
    //     'email': ['administrador@email.com', [Validators.required, Validators.email]],
    //     'pass': ['123456', Validators.required]
    //   });
    // }
  }

  ngOnInit(): void {
    this.auth.logout();
  }

  login() {

    if (this.formLogin.valid) {
      console.log(this);

      this.auth.login(this.formLogin.controls['email'].value,
        this.formLogin.controls['pass'].value).subscribe(() => {
          this.router.navigateByUrl("home");
        });

    } else {
      alert('Email / Senha inválido(s)');
    }

  }

}
