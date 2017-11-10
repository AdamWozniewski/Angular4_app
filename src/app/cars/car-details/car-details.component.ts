import { Component, OnInit } from '@angular/core';
import { CarsServiceService } from '../cars-service.service';
import { ActivatedRoute } from '@angular/router';
import { Cars } from '../models/car';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.less']
})
export class CarDetailsComponent implements OnInit {
  car: Cars;
  constructor(private carsService: CarsServiceService, private route: ActivatedRoute) { }

  loadCar(): void {
    const id = +this.route.snapshot.params['id'];
    this.carsService.getOneCar(id).subscribe((car) => {
      this.car = car;
    });
  }
  ngOnInit() {
   this.car = this.route.snapshot.data['car'];
  }
}
