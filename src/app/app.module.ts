import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarsModule } from './cars/cars.module';
import { CarsServiceService } from './cars/cars-service.service';
import { HttpModule } from '@angular/http';
import { CoreModuleModule } from './core-module/core-module.module';
import { RouterModule } from '@angular/router';
import { CarsListComponent } from './cars/cars-list/cars-list.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CarsModule,
    BrowserModule,
    HttpModule,
    CoreModuleModule,
    RouterModule.forRoot([
        {
          path: 'cars',
          component: <any>CarsListComponent
        }
    ])
  ],
  providers: [CarsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
