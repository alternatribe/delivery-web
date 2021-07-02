import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
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


  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {
    if (environment.production) {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(128)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)])
      });
    } else {
      this.form = new FormGroup({
        email: new FormControl('funcionario1@email.com', [Validators.required, Validators.email, Validators.maxLength(128)]),
        password: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(128)])
      });

    }
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.tokenStorage.signOut();
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
      data => {
        //console.log(data);

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
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
