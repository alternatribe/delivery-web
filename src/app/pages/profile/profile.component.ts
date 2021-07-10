import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import PasswordValidator from '../../share/password.validator';
import { ModalService } from '../../share/modal/modal.service';
import { Router } from '@angular/router';
import { Estado } from '../../models/estado.model';
import { Cidade } from '../../models/cidade.model';
import { UtilService } from '../../share/services/util.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formProfile: FormGroup;
  formPassword: FormGroup;
  isLoadingProfile: boolean = false;
  isLoadingPassword: boolean = false;
  isLoadingRemove: boolean = false;
  profileSubmitted: boolean = false;
  passwordsubmitted: boolean = false;
  isLogged: boolean = false;
  currentUser: User = new User();
  newUser: User = new User();
  errorProfile = "";
  errorPassword = "";
  errorRemove = "";
  bodyText: string = "";

  listaEstados: Estado[] = [];
  listaCidades: Cidade[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService, private modalService: ModalService, private utilService: UtilService) {
    this.formProfile = new FormGroup({
      name: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: true }),
      address: new FormGroup({
        zip: new FormControl(null),
        houseNumber: new FormControl(null),
        reference: new FormControl(null),
        street: new FormControl(null),
        district: new FormControl({ value: null, disabled: true }),
        city: new FormControl({ value: null, disabled: true }),
        state: new FormControl(null),
      })
    });
    this.formPassword = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]),
      confirmPassword: new FormControl('', Validators.required)
    },
      {
        validators: [PasswordValidator.equals('newPassword', 'confirmPassword'), PasswordValidator.notEquals('password', 'newPassword')]
      });
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
    this.userService.details(this.authService.getUser().id).subscribe(
      (user) => {
        console.log(user);

        this.currentUser = user;
        this.formProfile.patchValue(user);
      }
    );
    this.utilService.getEstados().subscribe(lista => this.listaEstados = lista);
  };

  get f(): { [key: string]: AbstractControl } {
    return this.formProfile.controls;
  }

  get fp(): { [key: string]: AbstractControl } {
    return this.formPassword.controls;
  }

  onUpdateProfile(): void {
    this.profileSubmitted = true;
    if (this.formProfile.invalid) {
      return;
    }

    this.isLoadingProfile = true;
    this.newUser = Object.assign({}, this.formProfile.value);
    this.newUser.id = this.currentUser.id;
    this.userService.update(this.newUser).subscribe(
      () => {
        this.isLoadingProfile = false;
        this.modalService.open('confirm-modal');
      },
      err => {
        if (err.error) {
          if (err.error.message) {
            this.errorProfile = err.error.message;
          } else {
            this.errorProfile = err.message;
          }
        } else {
          this.errorProfile = "Erro Desconhecido";
        }
        this.isLoadingProfile = false;
      })
  }

  onUpdatePassword(): void {
    this.passwordsubmitted = true;
    if (this.formPassword.invalid) {
      return;
    }
    this.isLoadingPassword = true;
    this.newUser.id = this.currentUser.id;
    console.log(this.fp);
    this.newUser.password = this.fp.password.value;
    this.newUser.newPassword = this.fp.newPassword.value;
    this.userService.update(this.newUser).subscribe(
      () => {
        this.isLoadingPassword = false;
        this.modalService.open('confirm-modal');
        this.onResetPassword();
      },
      err => {
        if (err.error) {
          if (err.error.message === 'Bad credentials') {
            this.errorPassword = "Usuário e/ou Senha Inválido(s)!!!";
          } else
            if (err.error.message) {
              this.errorPassword = err.error.message;
            } else {
              this.errorPassword = err.message;
            }
        } else {
          this.errorPassword = "Erro Desconhecido";
        }
        this.isLoadingPassword = false;
      })
  }

  onExcluir() {
    this.userService.delete(this.currentUser.id).subscribe(
      () => {
        this.authService.logout();
        this.modalService.open('remove-modal');
        this.isLoadingRemove = false;
      },
      (err) => {
        if (err.error) {
          if (err.error.message) {
            this.errorRemove = err.error.message;
          } else {
            this.errorRemove = err.message;
          }
        } else {
          this.errorRemove = "Erro Desconhecido";
        }
        this.isLoadingRemove = false;
      }
    )
  }

  onResetProfile(): void {
    this.profileSubmitted = false;
    this.formProfile.reset();
    this.formProfile.patchValue({ name: this.currentUser.name, email: this.currentUser.email });
    this.errorProfile = "";
  }

  onResetPassword(): void {
    this.passwordsubmitted = false;
    this.formPassword.reset();
    this.errorPassword = "";
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id).subscribe(
      () => {
        this.router.navigateByUrl("profile");
      }
    );
  }

  closeModalRemove(id: string) {
    this.modalService.close(id).subscribe(
      () => {
        this.router.navigateByUrl("home");
      }
    );
  }
}

