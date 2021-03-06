import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from '../shared/shared.module'
import { CustomerRoutingModule } from './customer-routing.module'
import { CustomerSearchService } from './customer-search/customer-search.service'
import { CustomerEditService } from './customer-edit/customer-edit.service'
import { CustomerSearchComponent } from './customer-search/customer-search.component'
import { CustomerEditComponent } from './customer-edit/customer-edit.component'
import { CustomerCompactComponent } from './customer-compact/customer-compact.component'
import { CustomerEditContactComponent } from './customer-edit-contact/customer-edit-contact.component'
import { CustomerService } from './customer.service';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    SharedModule,
    CustomerRoutingModule
  ],
  declarations: [
    CustomerCompactComponent,
    CustomerEditComponent,
    CustomerSearchComponent,
    CustomerEditContactComponent
  ],
  exports: [
    CustomerCompactComponent,
    CustomerEditComponent,
    CustomerSearchComponent,
    CustomerEditContactComponent
  ],
  providers: [
    CustomerEditService,
    CustomerSearchService,
    CustomerService
  ]
})
export class CustomerModule { }
