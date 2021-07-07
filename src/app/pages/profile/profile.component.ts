import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import PasswordValidator from '../../share/password.validator';
import { ModalService } from '../../share/modal/modal.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;
  submitted: boolean = false;
  isLogged: boolean = false;
  currentUser: User = new User();
  error = "";
  bodyText: string = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService, private modalService: ModalService) {
    this.form = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.maxLength(128)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(128)]),
      password: new FormControl('', [Validators.minLength(6), Validators.maxLength(128)]),
      newPassword: new FormControl('', [Validators.minLength(6), Validators.maxLength(128)]),
      confirmPassword: new FormControl('')
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

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    console.log(JSON.stringify(this.form.value, null, 2));
    this.userService.update(this.currentUser.id, this.f.fullname.value, this.f.email.value, this.f.password.value, this.f.newPassword.value).subscribe(
      () => {
        this.isLoading = false;
        this.modalService.open('confirm-modal');
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

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

