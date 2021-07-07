import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class PasswordValidator {
  static equals(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors.matching) {
        return null;
      }

      if (control?.value === "" && control?.value === checkControl?.value) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  static notEquals(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors.matching) {
        return null;
      }

      if (control?.value === "" && control?.value === checkControl?.value) {
        return null;
      }

      if (control?.value === checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
