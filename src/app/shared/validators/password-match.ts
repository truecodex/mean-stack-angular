import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passconf = control.get('passconf');
  if (password.value && passconf.value) {
    return password.value !== passconf.value ? { 'passwordmatch': true } : null;
  }
  return null;
};
