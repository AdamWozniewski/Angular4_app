import { Component, OnInit } from '@angular/core';
import { CarsServiceService } from '../cars-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cars } from '../models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.less']
})
export class CarDetailsComponent implements OnInit {
  car: Cars;
  carForm: FormGroup;
  constructor(
      private carsService: CarsServiceService,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router,
  ) { }
  buildCarForm() {
    return this.formBuilder.group({
      model: [this.car.model, [Validators.required]],
      type: this.car.type,
      plate: [this.car.plate, [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
      deliveryDate: this.car.deliveryDate,
      deadline: this.car.deadline,
      color: this.car.color,
      power: this.car.power,
      clientFirstName: this.car.clientFirstName,
      clientSurname: this.car.clientSurname,
      cost: this.car.cost,
      isFullyDamaged: this.car.isFullyDamaged,
      year: this.car.year
    });
  }
  updateCar() {
    this.carsService.updateCar(this.car.id, this.carForm.value).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }
  ngOnInit() {
    this.car = this.route.snapshot.data['car'];
    this.carForm = this.buildCarForm();
  }
}
