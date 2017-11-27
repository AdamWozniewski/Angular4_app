import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
    Renderer2
} from '@angular/core';
import {Cars} from '../models/car';

@Component({
  selector: '[app-car-table-row]',
  templateUrl: './car-table-row.component.html'
})
export class CarTableRowComponent implements OnInit {
  @Input() car: Cars;
  @Output() removedCar = new EventEmitter();
  @HostBinding('class.after-deadline') deadline: boolean = false;
  @HostListener('mouseenter') onMouseEnter() {
    this.setRemoveBtnStyle('red');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setRemoveBtnStyle('black');
  }

  setRemoveBtnStyle(color) {
    this.renderer.setStyle(this.el.nativeElement.querySelector('.remove-btn'), 'color', color);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  removeCar(car, event) {
    event.stopPropagation();
    this.removedCar.emit(car);
  }

  ngOnInit() {
    this.deadline = new Date(this.car.deadline) < new Date();
  }
}
