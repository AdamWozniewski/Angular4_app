import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsListComponent } from './cars-list/cars-list.component';
import { TotalCostComponent } from './total-cost/total-cost.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { CarDetailsComponent } from './car-details/car-details.component';
import { RouterModule } from '@angular/router';
import { CarResolveService } from './car-resolve.service';
import { ReactiveFormsModule } from '@angular/forms';
import { IncomeTaxComponent } from './total-cost/income-tax/income-tax.component';
import { CostSharedService } from './cost-shared.service';
import { CarTableRowComponent } from './car-table-row/car-table-row.component';
import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars/cars.component';
import { DateInfoComponent } from './car-details/date-info/date-info.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule,
    ReactiveFormsModule,
    CarsRoutingModule
  ],
  exports: [CarsListComponent],
  declarations: [
      CarsListComponent,
      TotalCostComponent,
      CarDetailsComponent,
      IncomeTaxComponent,
      CarTableRowComponent,
      CarsComponent,
      DateInfoComponent
  ],
  providers: [CarResolveService, CostSharedService],
  entryComponents: [DateInfoComponent]
})
export class CarsModule { }
