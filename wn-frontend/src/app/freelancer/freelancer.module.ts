import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { FreelancerRoutingModule } from './freelancer-routing.module';
import { FreelancerSearchService } from './freelancer-search/freelancer-search.service';
import { FreelancerEditService } from './freelancer-edit/freelancer-edit.service';
import { FreelancerSearchComponent } from './freelancer-search/freelancer-search.component';
import { FreelancerEditComponent } from './freelancer-edit/freelancer-edit.component';
import { FreelancerCompactComponent } from './freelancer-compact/freelancer-compact.component';

@NgModule({
  imports: [
    NgbModule,
    SharedModule,
    FreelancerRoutingModule
  ],
  declarations: [
    FreelancerSearchComponent,
    FreelancerCompactComponent,
    FreelancerEditComponent
  ],
  exports: [
    FreelancerSearchComponent,
    FreelancerCompactComponent,
    FreelancerEditComponent
  ],
  providers: [
    FreelancerSearchService,
    FreelancerEditService
  ]
})
export class FreelancerModule { }
