import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { Cars } from '../models/car';
import { TotalCostComponent } from '../total-cost/total-cost.component';
import { CarsServiceService } from '../cars-service.service';
import { Router } from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CostSharedService } from '../cost-shared.service';
import { CarTableRowComponent } from '../car-table-row/car-table-row.component';
import { PowerValidators } from '../../shared-module/validators/validators';
import { CanDeactivateComponent } from '../../guards/can-deactivate.guard';
@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CarsListComponent implements OnInit, AfterViewChecked, AfterViewInit, CanDeactivateComponent {
    @ViewChild('totalCostRef') totalCostRef: TotalCostComponent;
    @ViewChildren(CarTableRowComponent) carRows: QueryList<CarTableRowComponent>;
    @ViewChild('addCarTitle') addCarTitle: ElementRef;
    totalCost: number;
    grossShown: number;
    cars: Cars[] = [];
    carForm: FormGroup;
    innerCounter: number = 0;
    constructor(
        private carsService: CarsServiceService,
        private costService: CostSharedService,
        private router: Router,
        private formBuilder: FormBuilder,
        private renderer: Renderer2
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
            power: ['', PowerValidators.power],
            clientFirstName: '',
            clientSurname: '',
            isFullyDamaged: '',
            year: '',
            parts: this.formBuilder.array([])
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
    togglePlateValidate() {
        const damageControl = this.carForm.get('isFullyDamaged');
        const plateControle = this.carForm.get('plate');

        if (damageControl.value === true) {
            plateControle.clearValidators();
        } else {
            plateControle.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(7)]);
        }
        plateControle.updateValueAndValidity();
    }
    onRemoveCar(car: Cars) {
        event.stopPropagation();
        this.carsService.deleteOneCar(car.id).subscribe(() => {
            this.loadCars();
        });
    }
    getPartsCost(parts) {
        return parts.reduce((prev, next) => parseFloat(prev) + parseFloat(next.price), 0);
    }
    sendAddingCar() {
        const carFormData = Object.assign({}, this.carForm.value);
        carFormData.cost = this.getPartsCost(carFormData.parts);
        this.carsService.addCar(carFormData).subscribe(() => {
            this.loadCars();
            this.carForm.reset();
        });
    }

    // funkcje deaktywacyjne z interfaceu
    canDeactivate() {
        if (!this.carForm.dirty) {
            return true;
        }
        return window.confirm('Porzucić zmiany ?');
    }
    ngOnInit() {
        this.loadCars();
        this.carForm = this.buildCarForm();
    }
    ngAfterViewInit() {
        const addCarTitle = this.addCarTitle.nativeElement;
        this.carForm.valueChanges.subscribe(() => {
            if (this.carForm.invalid) {
                addCarTitle.style.color = 'red';
                this.renderer.setStyle(addCarTitle, 'font-weight', '1000');
            } else {
                addCarTitle.style.color = 'white';
                this.renderer.setStyle(addCarTitle, 'font-weight', '700');
            }
        });
        this.carRows.changes.subscribe(row => {
            if (this.carRows.first.car.clientSurname === 'Kowalski') {
                console.log('kolejny w kolejce: Kowalski');
            }
        });
    }
    ngAfterViewChecked() {
        // this.innerCounter++; // śledzenie zdarzen
        // console.log(this.innerCounter);
    }
}
