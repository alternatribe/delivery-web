import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export default class FormValidator {

  static cep(control: AbstractControl) {
    let cep = control.value;
    if (cep && cep !== '') {
      cep = cep.replace(/\D/g, '');
      const validacao = /^[0-9]{8}$/;
      return validacao.test(cep) ? null : { cepInvalido: true }
    }
    return null;
  }
}

