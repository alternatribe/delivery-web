import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import PasswordValidator from '../../share/password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoading = false;
  submitted = false;
  error = "";
  authInscription: Subscription = new Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.maxLength(128)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(128)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
      {
        validators: [PasswordValidator.equals('password', 'confirmPassword')]
      });
  }

  ngOnDestroy(): void {
    this.authInscription.unsubscribe();
  }

  ngOnInit(): void {
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    console.log(JSON.stringify(this.form.value, null, 2));
    this.authInscription = this.authService.register(this.f.fullname.value, this.f.email.value, this.f.password.value).subscribe(
      () => {
        this.isLoading = true;
        this.router.navigateByUrl("home");
      },
      err => {
        if (err.error?.message) {
          this.error = err.error.message;
        } else {
          if (err.error) {
            this.error = err.error;
          } else {
            if (err.message) {
              this.error = err.message;
            } else {
              this.error = "Erro desconhecido";
            }
          }
        }
        this.isLoading = false;
      })
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


}

