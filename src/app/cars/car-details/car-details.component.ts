import { Component, OnInit } from '@angular/core';
import { CarsServiceService } from '../cars-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cars } from '../models/car';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    let parts = this.car.parts
        ? this.car.parts.map(part => this.formBuilder.group(part))
        : [];
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
      isFullyDamaged: this.car.isFullyDamaged,
      year: this.car.year,
      parts: this.formBuilder.array(parts)
    });
  }
  buildParts(): FormGroup {
    return this.formBuilder.group({
      name: '',
      inStock: true,
      price: ''
    });
  }
  get parts(): FormArray {
    return <FormArray>this.carForm.get('parts');
  }
  addPart(): void {
    this.parts.push(this.buildParts());
  }
  removePart(index: number): void {
    this.parts.removeAt(index);
  }
  getPartsCost(parts) {
    return parts.reduce((prev, next) => parseFloat(prev) + parseFloat(next.price), 0);
  }
  updateCar() {
    const carFormData = Object.assign({}, this.carForm.value);
    carFormData.cost = this.getPartsCost(carFormData.parts);
    this.carsService.updateCar(this.car.id, carFormData).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }
  ngOnInit() {
    this.car = this.route.snapshot.data['car'];
    this.carForm = this.buildCarForm();
  }
}
