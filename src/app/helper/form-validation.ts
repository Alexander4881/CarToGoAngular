import { FormGroup } from '@angular/forms';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';

export class FormValidation {
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = nameRe.test(control.value);
    console.log('forbiddenNameValidator:');
    console.log(control.value);
    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
  };
}


export function mastMatchValidator(refFirst: string, refSecond: string): ValidatorFn {
  return(control: FormGroup): ValidationErrors | null => {
    const name = control.get(refFirst);
    const alterEgo = control.get(refSecond);

    // set error on matchingControl if validation fails
    if (name.value !== alterEgo.value) {
      alterEgo.setErrors({ mastMatch: true });
      return { 'mastMatch': true };
    } else {
      alterEgo.setErrors(null);
      return null;
    }
  }
}
