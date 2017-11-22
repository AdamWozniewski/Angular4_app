import {Component, OnDestroy, OnInit} from '@angular/core';
import {CostSharedService} from '../../cost-shared.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-income-tax',
    templateUrl: './income-tax.component.html'
})
export class IncomeTaxComponent implements OnInit, OnDestroy {

  private incomeTax: number = 18;
  income: number;
  costSubscribstion: Subscription;
  constructor(private costService: CostSharedService) { }

  ngOnInit() {
    this.costSubscribstion = this.costService.totalCostSources$.subscribe((cost) => {
      this.income = cost * this.incomeTax / 100;
    });
  }
  ngOnDestroy() {
    if (this.costSubscribstion) {
      this.costSubscribstion.unsubscribe();
    }
  }
}
