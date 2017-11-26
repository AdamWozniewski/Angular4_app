import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { CoreModuleModule } from './core-module/core-module.module';
import { AppRoutingModule } from './app-routing.module';
import {
  CarsModule,
  CarsServiceService
} from './cars/index.ts';
import { LoginModule } from './login/login.module';
import { AuthService } from './auth/auth.service';
import { GuardAuthGuard } from './guards/guard-auth.guard';
import { LayoutService } from './shared-module/services/layout.service';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { SharedModuleModule } from './shared-module/shared-module.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LoginModule,
    BrowserModule,
    HttpModule,
    CoreModuleModule,
    AppRoutingModule,
    SharedModuleModule
  ],
  providers: [
      CarsServiceService,
      AuthService,
      GuardAuthGuard,
      CanDeactivateGuard,
      LayoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
