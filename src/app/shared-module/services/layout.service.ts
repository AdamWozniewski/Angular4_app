import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LayoutService {
  sideBarSources$ = new Subject<boolean>(); // $ oznacza observable
  showSideBar(): void {
    this.sideBarSources$.next(true);
  }
  hideSideBar(): void {
    this.sideBarSources$.next(false);
  }
}
