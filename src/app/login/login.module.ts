import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LoginRoutingModule
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent]
})
export class LoginModule { }
