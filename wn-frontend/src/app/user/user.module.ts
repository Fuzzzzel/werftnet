import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserService } from './user.service'
import { AuthGuardService } from './auth-guard.service'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { UserChangePwdComponent } from './user-change-pwd/user-change-pwd.component'
import { SharedModule } from '../shared/shared.module'
import { UserOverviewComponent } from './user-overview/user-overview.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  exports: [],
  declarations: [UserProfileComponent, UserChangePwdComponent, UserOverviewComponent],
  providers: [
    UserService,
    AuthGuardService
  ]
})
export class UserModule { }
