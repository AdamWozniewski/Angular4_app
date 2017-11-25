import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cars} from '../models/car';

@Component({
  selector: '[app-car-table-row]',
  templateUrl: './car-table-row.component.html'
})
export class CarTableRowComponent implements OnInit {
  @Input() car: Cars;
  @Output() removedCar = new EventEmitter();

  removeCar(car, event) {
    event.stopPropagation();
    this.removedCar.emit(car);
  }
  ngOnInit() {
  }
}
