import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCompactComponent } from './order-compact/order-compact.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { SharedModule } from '../../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderSearchService } from './order-search/order-search.service';
import { OrderEditService } from './order-edit/order-edit.service';
import { OrderHeadViewComponent } from './order-edit/order-head-view/order-head-view.component';
import { OrderHeadEditComponent } from './order-edit/order-head-edit/order-head-edit.component';
import { OrderPositionViewComponent } from './order-position-view/order-position-view.component';
import { OrderPositionEditComponent } from './order-position-edit/order-position-edit.component';
import { OrderTaskService } from './order-task.service';

@NgModule({
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
  declarations: [
    OrderCompactComponent,
    OrderEditComponent,
    OrderSearchComponent,
    OrderHeadViewComponent,
    OrderHeadEditComponent,
    OrderPositionViewComponent,
    OrderPositionEditComponent
  ],
  exports: [
    OrderCompactComponent,
    OrderEditComponent,
    OrderSearchComponent
  ],
  providers: [
    OrderSearchService,
    OrderEditService,
    OrderTaskService
  ]
})
export class OrderModule { }
