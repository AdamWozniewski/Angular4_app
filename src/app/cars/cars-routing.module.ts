import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarResolveService } from './car-resolve.service';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarsComponent } from './cars/cars.component';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';

const CARS_ROUTES: Route[] = [
    {
        path: '',
        component: <any>CarsComponent,
        children: [
            {
                path: '',
                component: <any>CarsListComponent,
                canDeactivate: [CanDeactivateGuard]
            },
            {
                path: ':id',
                component: <any>CarDetailsComponent,
                resolve: { car: CarResolveService }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(CARS_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class CarsRoutingModule {}