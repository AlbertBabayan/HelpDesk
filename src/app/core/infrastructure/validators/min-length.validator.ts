import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function minLength(num: number): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any | null }> => {
    if (control.value.length < num) {
      return of({ minLength: { message: `Type minimum ${num} characters` } });
    } else {
      return of(null);
    }
  };
}
