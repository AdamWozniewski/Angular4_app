import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CarsServiceService } from '../cars-service.service';

@Component({
  selector: 'app-total-cost',
  templateUrl: './total-cost.component.html',
  styleUrls: ['./total-cost.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarsServiceService],
})
export class TotalCostComponent {
  @Input() totalCost: number;
  @Output() shownGross: EventEmitter<number> = new EventEmitter<number>();
  private VAT: number = 1.23;

  constructor(private carsService: CarsServiceService) {}

  showGross(): void {
    this.shownGross.emit(this.totalCost * this.VAT);
  }
}
