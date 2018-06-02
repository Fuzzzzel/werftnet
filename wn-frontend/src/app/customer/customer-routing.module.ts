import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuardService as AuthGuard } from '../user/auth-guard.service'
import { CustomerSearchComponent } from './customer-search/customer-search.component'
import { CustomerEditComponent } from './customer-edit/customer-edit.component'
import { CustomerEditContactComponent } from './customer-edit-contact/customer-edit-contact.component'

/**
 * Routes used in the app
 */
const ROUTE_CONFIG: Routes = [
  {
    path: 'customer',
    component: CustomerSearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/edit',
    component: CustomerEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/edit_contact',
    component: CustomerEditContactComponent,
    canActivate: [AuthGuard]
  }

]

@NgModule({
  imports: [
    RouterModule.forChild(ROUTE_CONFIG)
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
