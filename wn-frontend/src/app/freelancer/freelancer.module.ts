import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from '../shared/shared.module'
import { FreelancerRoutingModule } from './freelancer-routing.module'
import { FreelancerSearchService } from './freelancer-search/freelancer-search.service'
import { FreelancerEditService } from './freelancer-edit/freelancer-edit.service'
import { FreelancerSearchComponent } from './freelancer-search/freelancer-search.component'
import { FreelancerEditComponent } from './freelancer-edit/freelancer-edit.component'
import { FreelancerCompactComponent } from './freelancer-compact/freelancer-compact.component';
import { FreelancerEditPriceComponent } from './freelancer-edit-price/freelancer-edit-price.component'

@NgModule({
  imports: [
    NgbModule,
    SharedModule,
    FreelancerRoutingModule
  ],
  declarations: [
    FreelancerSearchComponent,
    FreelancerCompactComponent,
    FreelancerEditComponent,
    FreelancerEditPriceComponent
  ],
  exports: [
    FreelancerSearchComponent,
    FreelancerCompactComponent,
    FreelancerEditComponent,
    FreelancerEditPriceComponent
  ],
  providers: [
    FreelancerSearchService,
    FreelancerEditService
  ]
})
export class FreelancerModule { }
