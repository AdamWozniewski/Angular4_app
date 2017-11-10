import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarsModule } from './cars/cars.module';
import { CarsServiceService } from './cars/cars-service.service';
import { HttpModule } from '@angular/http';
import { CoreModuleModule } from './core-module/core-module.module';
import { AppRoutingModule } from './app-routing.module';
import { CarsRoutingModule } from './cars/cars-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CarsModule,
    BrowserModule,
    HttpModule,
    CoreModuleModule,
    AppRoutingModule,

    CarsRoutingModule
  ],
  providers: [CarsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
