import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuardService as AuthGuard } from '../user/auth-guard.service'
import { AdminOverviewComponent } from './admin-overview/admin-overview.component'
import { AdminSimpleEntityComponent } from './admin-simple-entity/admin-simple-entity.component'
import { AdminTwoLevelEntityComponent } from './admin-two-level-entity/admin-two-level-entity.component'
import { AdminUserOverviewComponent } from './admin-user-overview/admin-user-overview.component'
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component'
import { AdminComponent } from './admin/admin.component'
import { AdminSystemEditImprintComponent } from './system/admin-system-edit-imprint/admin-system-edit-imprint.component'

/**
 * Routes used in the module
 */
const ROUTE_CONFIG: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        component: AdminOverviewComponent,
      },
      {
        path: 'anrede',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'anrede'
        }
      },
      {
        path: 'country',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'country'
        }
      },
      {
        path: 'sector',
        component: AdminTwoLevelEntityComponent,
        data: {
          entity: 'Sector'
        }
      },
      {
        path: 'language',
        component: AdminTwoLevelEntityComponent,
        data: {
          entity: 'Language'
        }
      },
      {
        path: 'service',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'Service'
        }
      },
      {
        path: 'priceunit',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'PriceUnit'
        }
      },
      {
        path: 'currency',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'Currency'
        }
      },
      {
        path: 'cattool',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'CatTool'
        }
      },
      {
        path: 'flpaymenttype',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'FreelancerPaymentType'
        }
      },
      {
        path: 'flinvoicingtype',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'FreelancerInvoicingType'
        }
      },
      {
        path: 'flrating',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'FreelancerRating'
        }
      },
      {
        path: 'flstatus',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'FreelancerStatus'
        }
      },
      {
        path: 'custorigin',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'CustomerOrigin'
        }
      },
      {
        path: 'custpotential',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'CustomerPotential'
        }
      },
      {
        path: 'custstatus',
        component: AdminSimpleEntityComponent,
        data: {
          entity: 'CustomerStatus'
        }
      },
      {
        path: 'usermanagement',
        component: AdminUserOverviewComponent,
      },
      {
        path: 'usermanagement/edit_user/:userId',
        component: AdminUserEditComponent,
      },
      {
        path: 'system/edit_imprint',
        component: AdminSystemEditImprintComponent,
      }

    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(ROUTE_CONFIG)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
