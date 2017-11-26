import { Injectable } from '@angular/core';
import {LayoutService} from '../shared-module/services/layout.service';

@Injectable()
export class AuthService {
  private fakeUser = {
    login: 'admin',
    password: 'admin'
  };
  private isUserLoggedIn: boolean = false;

  constructor(private layoutService: LayoutService) { }
  login(login, password) {
    return new Promise((resolve, reject) => {
      if (login === this.fakeUser.login &&
          password === this.fakeUser.password
      ) {
        this.isUserLoggedIn = true;
        resolve();
      } else {
        reject();
      }
    });
  }

  logout() {
    this.isUserLoggedIn = false;
    this.layoutService.hideSideBar();
  }

  isLoggedIn() {
    return this.isUserLoggedIn;
  }
}
