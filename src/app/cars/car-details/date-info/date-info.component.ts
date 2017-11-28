import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cars} from '../../models/car';

@Component({
  selector: 'app-date-info',
  templateUrl: './date-info.component.html',
  styleUrls: ['./date-info.component.less']
})
export class DateInfoComponent {
  @Input() carForDate: Cars;
  @Output() checkElapsedDate = new EventEmitter<number>();

  getElapsedDate() {
    const elapsedMiliseconds = +new Date() - +new Date(this.carForDate.deliveryDate);
    this.checkElapsedDate.emit(elapsedMiliseconds / (1000 * 60 * 60 * 24));
  }
}
