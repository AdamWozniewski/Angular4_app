import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import {LayoutService} from "../../shared-module/services/layout.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  private login: string = '';
  private password: string = '';

  constructor(private authService: AuthService,
              private router: Router,
              private layoutService: LayoutService
  ) { }

  onSubmitAccess() {
    this.router.navigate(['/cars']).then(() => {
      this.layoutService.showSideBar();
    });
  }
  onSubmitFailuare() {
      this.router.navigate(['/login']);
  }
  onSubmit() {
    this.authService.login(this.login, this.password)
        .then(this.onSubmitAccess.bind(this), this.onSubmitFailuare.bind(this));
  }
}
