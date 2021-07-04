import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form: FormGroup;
  isLoading = false;
  isSubmitted = false;
  error = "";


  constructor(private authService: AuthService, private router: Router) {
    if (environment.production) {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(128)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)])
      });
    } else {
      this.form = new FormGroup({
        email: new FormControl('cliente1@email.com', [Validators.required, Validators.email, Validators.maxLength(128)]),
        password: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(128)])
      });

    }
  }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.authService.logout();
    }
  }

  get f() { return this.form.controls; }

  login() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;

    }
    this.isLoading = true;
    this.authService.login(this.f.email.value, this.f.password.value).subscribe(
      () => {
        this.isLoading = true;
        this.router.navigateByUrl("home");
      },
      err => {
        if (err.error.message) {
          this.error = err.error.message;
        } else {
          if (err.message) {
            this.error = err.message;
          } else {
            this.error = "Erro desconhecido";
          }
        }
        this.isLoading = false;
      })
  }

  clearErro() {
    this.error = "";
  }

}
