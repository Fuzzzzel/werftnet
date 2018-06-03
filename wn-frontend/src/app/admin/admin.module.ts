import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminOverviewComponent } from './admin-overview/admin-overview.component'
import { SharedModule } from '../shared/shared.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AdminSimpleEntityComponent } from './admin-simple-entity/admin-simple-entity.component'
import { AdminTwoLevelEntityComponent, MakeSubItemModalContent } from './admin-two-level-entity/admin-two-level-entity.component'
import { AdminUserOverviewComponent } from './admin-user-overview/admin-user-overview.component'
import { AdminUserService } from './admin-user.service'
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component'
import { AdminUserEditService } from './admin-user-edit/admin-user-edit.service'
import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin/admin.component'
import { RouterModule, RouterOutlet } from '@angular/router'
import { AdminSystemEditImprintComponent } from './system/admin-system-edit-imprint/admin-system-edit-imprint.component'
import { AdminSystemEditImprintService } from './system/admin-system-edit-imprint/admin-system-edit-imprint.service'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminOverviewComponent,
    AdminSimpleEntityComponent,
    AdminTwoLevelEntityComponent,
    MakeSubItemModalContent,
    AdminUserOverviewComponent,
    AdminUserEditComponent,
    AdminComponent,
    AdminSystemEditImprintComponent
  ],
  entryComponents: [
    MakeSubItemModalContent
  ],
  exports: [
    AdminOverviewComponent
  ],
  providers: [
    AdminUserService,
    AdminUserEditService,
    AdminSystemEditImprintService
  ]
})
export class AdminModule { }
