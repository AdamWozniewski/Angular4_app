import { CarsServiceService } from './cars-service.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Cars } from './models/car';
import { Injectable } from '@angular/core';

@Injectable()
export class CarResolveService implements Resolve<Cars> {
    constructor(private carService: CarsServiceService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.carService.getOneCar(route.params['id']);
    }
}