import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function maxLength(num: number): AsyncValidatorFn{
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
        if (control.value.length > num){
            return of({maxLength: {message: `Must not be more than ${num} characters`}});
        }
        return of(null);
    };
}
