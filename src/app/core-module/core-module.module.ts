import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModuleModule
  ],
  exports: [SidebarComponent],
  declarations: [SidebarComponent]
})
export class CoreModuleModule { }
