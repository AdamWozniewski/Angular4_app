import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { GuardAuthGuard } from './guards/guard-auth.guard';
import { PageNotFoundComponent } from './shared-module/page-not-found/page-not-found.component';

const APP_ROUTES: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'cars', loadChildren: 'app/cars/cars.module#CarsModule', canLoad: [GuardAuthGuard] },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES, {enableTracing: false})
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}