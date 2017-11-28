import {
    Component, ComponentFactoryResolver, ComponentRef, OnInit, Type, ViewChild,
    ViewContainerRef
} from '@angular/core';
import { CarsServiceService } from '../cars-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cars } from '../models/car';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateInfoComponent } from './date-info/date-info.component';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.less']
})
export class CarDetailsComponent implements OnInit {
  @ViewChild('dateInfoContainer', {read: ViewContainerRef}) dateInfoContainer: ViewContainerRef;
  car: Cars;
  carForm: FormGroup;
  elapsedDays: number;
  dateInfoRef;
  constructor(
    private carsService: CarsServiceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
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
  createDateInfo() {
    if (this.dateInfoContainer.get(0) !== null) {
      return;
    }
    const dateInfoFactory = this.componentFactoryResolver
        .resolveComponentFactory(<Type<DateInfoComponent>>DateInfoComponent);
    this.dateInfoRef = <ComponentRef<DateInfoComponent>>this.dateInfoContainer
      .createComponent(dateInfoFactory);
    this.dateInfoRef.instance.carForDate = this.car;
    this.dateInfoRef.instance.checkElapsedDate.subscribe((val) => {
      this.elapsedDays = val;
    });
  }

  clearDateInfoContainer() {
    // this.dateInfoContainer.clear(); //metoda 1, wywala wszuytskoe
    //   this.dateInfoContainer.remove(0) //metoda 2 wywala wybrany
      this.dateInfoRef.destroy();
  }
  ngOnInit() {
    this.car = this.route.snapshot.data['car'];
    this.carForm = this.buildCarForm();
  }
}
