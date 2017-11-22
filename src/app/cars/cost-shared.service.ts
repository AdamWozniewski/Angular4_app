import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CostSharedService {
  totalCostSources$ = new Subject<number>(); // $ oznacza observable
  sharedCost(cost: number) {
    this.totalCostSources$.next(cost);
  }
}
