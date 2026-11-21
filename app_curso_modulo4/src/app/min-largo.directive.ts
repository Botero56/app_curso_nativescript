import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import type { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

// Validador personalizado: exige una longitud mínima (ignora el campo vacío).
// Uso: <TextField [(ngModel)]="x" [minLargo]="3" #ctrl="ngModel">
@Directive({
  selector: '[minLargo][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinLargoDirective, multi: true }],
})
export class MinLargoDirective implements Validator {
  @Input() minLargo = 3;

  validate(control: AbstractControl): ValidationErrors | null {
    const valor = (control.value ?? '').trim();
    if (!valor || valor.length >= this.minLargo) return null;
    return { minLargo: { requerido: this.minLargo, actual: valor.length } };
  }
}
