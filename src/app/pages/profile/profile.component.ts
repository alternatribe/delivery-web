import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import PasswordValidator from '../../share/password.validator';
import { ModalService } from '../../share/modal/modal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  formPassword: FormGroup;
  isLoadingProfile: boolean = false;
  isLoadingPassword: boolean = false;
  isLoadingRemove: boolean = false;
  profileSubmitted: boolean = false;
  passwordsubmitted: boolean = false;
  isLogged: boolean = false;
  currentUser: User = new User();
  error = "";
  bodyText: string = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService, private modalService: ModalService) {
    this.form = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.maxLength(128)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(128)])
    },
      {
        validators: [PasswordValidator.equals('newPassword', 'confirmPassword'), PasswordValidator.notEquals('password', 'newPassword')]
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
    this.userService.get(this.authService.getUser().id).subscribe(
      (user) => {
        console.log(user);

        this.currentUser = user;
        this.form.patchValue({ fullname: user.name, email: user.email });
      }
    )
  };

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get fp(): { [key: string]: AbstractControl } {
    return this.formPassword.controls;
  }

  onUpdate(): void {
    this.profileSubmitted = true;
    // this.form.
    if (this.form.invalid) {
      return;
    }

    this.isLoadingProfile = true;
    console.log(JSON.stringify(this.formPassword.value));
    console.log(JSON.stringify(this.currentUser));
    // this.userService.update(this.currentUser.id, this.f.fullname.value, this.f.email.value, this.f.password.value, this.f.newPassword.value).subscribe(
    //   () => {
    //     this.isLoadingProfile = false;
    //     this.modalService.open('confirm-modal');
    //   },
    //   err => {
    //     if (err.error) {
    //       if (err.error.message) {
    //         this.error = err.error.message;
    //       } else {
    //         this.error = err.message;
    //       }
    //     } else {
    //       this.error = "Erro Desconhecido";
    //     }
    //     this.isLoadingProfile = false;
    //   })
  }

  onUpdatePassword(): void {
    this.passwordsubmitted = true;
    if (this.formPassword.invalid) {
      return;
    }
    this.isLoadingPassword = true;
    console.log(JSON.stringify(this.formPassword.value));
    console.log(JSON.stringify(this.currentUser));


    // this.userService.update(this.currentUser.id, this.fp.password.value, this.fp.newPassword.value).subscribe(
    //   () => {
    //     this.isLoadingPassword = false;
    //     this.modalService.open('confirm-modal');
    //   },
    //   err => {
    //     if (err.error) {
    //       if (err.error.message) {
    //         this.error = err.error.message;
    //       } else {
    //         this.error = err.message;
    //       }
    //     } else {
    //       this.error = "Erro Desconhecido";
    //     }
    //     this.isLoadingPassword = false;
    //   })
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
            this.error = err.error.message;
          } else {
            this.error = err.message;
          }
        } else {
          this.error = "Erro Desconhecido";
        }
        this.isLoadingRemove = false;
      }
    )
  }

  onResetProfile(): void {
    this.profileSubmitted = false;
    this.form.reset();
    this.form.patchValue({ fullname: this.currentUser.name, email: this.currentUser.email });
  }

  onResetPassword(): void {
    this.passwordsubmitted = false;
    this.formPassword.reset();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id).subscribe();
  }

  closeModalRemove(id: string) {
    this.modalService.close(id).subscribe(
      () => {
        this.router.navigateByUrl("home");
      }
    );
  }
}

