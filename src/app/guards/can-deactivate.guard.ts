import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CanDeactivateComponent {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {
    canDeactivate(component: CanDeactivateComponent): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}
