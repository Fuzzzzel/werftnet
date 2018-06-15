import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModule } from './order/order.module';
import { OrderCompactComponent } from './order/order-compact/order-compact.component';

@NgModule({
  imports: [
    CommonModule,
    OrderModule
  ],
  declarations: [],
  exports: [
    OrderModule
  ]
})
export class ProjectModule { }
