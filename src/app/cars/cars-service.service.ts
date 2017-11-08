import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cars } from './models/car';

@Injectable()
export class CarsServiceService {
  private upiUrl = 'http://localhost:3000/api/cars';
  random = Math.random();
  constructor(private http: Http) {}

    getCars() : Observable<Cars[]> {
        return this.http
            .get(this.upiUrl)
            .map((res) => res.json())
    }
}
