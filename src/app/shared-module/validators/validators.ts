import { AbstractControl } from '@angular/forms';

export class PowerValidators {
    static power(control: AbstractControl) {
        const minPower = 50;
        const maxPower = 800;
        if (control.value < minPower || control.value > maxPower) {
            return {
                powerValue: true
            };
        }
        return null;
    }
}