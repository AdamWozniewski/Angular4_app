import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import { Cars } from '../models/car';
import { TotalCostComponent } from '../total-cost/total-cost.component';
import { CarsServiceService } from '../cars-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CostSharedService} from "../cost-shared.service";
import {CarTableRowComponent} from "../car-table-row/car-table-row.component";
@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CarsListComponent implements OnInit, AfterViewInit {
    @ViewChild('totalCostRef') totalCostRef: TotalCostComponent;
    @ViewChildren(CarTableRowComponent) carRows: QueryList<CarTableRowComponent>;
    totalCost: number;
    grossShown: number;
    cars: Cars[] = [];
    carForm: FormGroup;
    constructor(
        private carsService: CarsServiceService,
        private costService: CostSharedService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
      // wykonywany jeszcze przed budowaniem komponentu, gdy nie ma wartosci
        console.log(carsService.random, '   CarsListComponent');
    }
    loadCars(): void {
        this.carsService.getCars().subscribe((cars) => {
            this.cars = cars;
            this.countTotalCost();
            this.costService.sharedCost(this.totalCost);
        });
    }
    countTotalCost(): void {
        this.totalCost = this.cars
            .map(car => car.cost)
            .reduce((prev, next) => prev + next); // prev spłaszcza tablicę
    }

    onShowGrossFromTotalCost(grossShown: number): void {
        this.grossShown = grossShown;
    }
    showGrossFromParentComponent(): void {
        this.totalCostRef.showGross();
    }
    goToCar(car: Cars) {
        this.router.navigate( ['/cars', car.id]);
    }
    buildCarForm() {
        return this.formBuilder.group({
            model: ['', [Validators.required]],
            type: '',
            plate: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
            deliveryDate: '',
            deadline: '',
            color: '',
            power: '',
            clientFirstName: '',
            clientSurname: '',
            cost: '',
            isFullyDamaged: '',
            year: ''
        });
    }
    onRemoveCar(car: Cars) {
        event.stopPropagation();
        this.carsService.deleteOneCar(car.id).subscribe(() => {
            this.loadCars();
        });
    }
    sendAddingCar() {
        this.carsService.addCar(this.carForm.value).subscribe(() => {
            this.loadCars();
            this.carForm.reset();
        });
    }
    ngOnInit() {
        this.loadCars();
        this.carForm = this.buildCarForm();
    }
    ngAfterViewInit() {
        this.carRows.changes.subscribe(row => {
            if (this.carRows.first.car.clientSurname === 'Kowalski') {
                console.log('kolejny w kolejce: Kowalski');
            }
        });
    }
}
