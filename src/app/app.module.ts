import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { CoreModuleModule } from './core-module/core-module.module';
import { AppRoutingModule } from './app-routing.module';
import {
  CarsModule,
  CarsServiceService,
  CarsRoutingModule
} from './cars/index.ts';

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
