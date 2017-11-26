import {Component, OnInit} from '@angular/core';
import {LayoutService} from './shared-module/services/layout.service';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';
  isSideBarVisible: boolean = false;
  isLoading: boolean = false;
  constructor(private layoutService: LayoutService, private router: Router) {}

  private checkRouterEvent(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {
      this.isLoading = true;
    } else if (
        routerEvent instanceof NavigationEnd
        || routerEvent instanceof NavigationCancel
        || routerEvent instanceof NavigationError) {
          this.isLoading = false;
      }
  }
  ngOnInit() {
    this.layoutService.sideBarSources$.subscribe((isVisible) => {
      this.isSideBarVisible = isVisible;
    });
    this.router.events.subscribe((routerEvent: Event) => this.checkRouterEvent(routerEvent));
  }
}
