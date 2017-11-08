import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsListComponent } from './cars-list/cars-list.component';
import { TotalCostComponent } from './total-cost/total-cost.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports: [CarsListComponent],
  declarations: [CarsListComponent, TotalCostComponent]
})
export class CarsModule { }
