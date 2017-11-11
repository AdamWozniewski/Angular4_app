import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsListComponent } from './cars-list/cars-list.component';
import { TotalCostComponent } from './total-cost/total-cost.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { CarDetailsComponent } from './car-details/car-details.component';
import { RouterModule } from '@angular/router';
import { CarResolveService } from './car-resolve.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [CarsListComponent],
  declarations: [CarsListComponent, TotalCostComponent, CarDetailsComponent],
  providers: [CarResolveService]
})
export class CarsModule { }
