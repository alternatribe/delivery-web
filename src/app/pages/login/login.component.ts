import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  form: FormGroup;
  isLoading = false;
  isSubmitted = false;
  error: string = "";
  refresh: string = "home";
  paramOption: any = null;
  loginInscription: Subscription = new Subscription;
  authInscription: Subscription = new Subscription;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
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

  ngOnDestroy(): void {
    this.loginInscription.unsubscribe();
    this.authInscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.authService.logout();
    }
    this.loginInscription = this.activatedRoute.queryParams.subscribe(
      (queryParams: any) => {
        let param = queryParams['refresh'];
        if (param) {
          this.refresh = param;
          this.paramOption = { queryParams: { 'finalize': 'true' } };
        }
      }
    )
  }

  get f() { return this.form.controls; }

  login() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;

    }
    this.isLoading = true;
    this.authInscription = this.authService.login(this.f.email.value, this.f.password.value).subscribe(
      () => {
        this.isLoading = true;
        if (this.paramOption) {
          this.router.navigate([this.refresh], this.paramOption);
        } else {
          this.router.navigate([this.refresh]);
        }
      },
      err => {
        if (err.error) {
          if (err.error.message === 'Bad credentials') {
            this.error = "Usuário e/ou Senha Inválido(s)!!!";
          } else if (err.error.message === 'Account disabled') {
            this.error = "Conta desativada!!! Por favor entre em contato por email...";
          } else if (err.error.message) {
            this.error = err.error.message;
          } else {
            this.error = err.message;
          }
        } else {
          this.error = "Erro Desconhecido";
        }
        this.isLoading = false;
      })
  }

  clearErro() {
    this.error = "";
  }

}
