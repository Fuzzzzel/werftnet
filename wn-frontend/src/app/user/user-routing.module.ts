// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { UserChangePwdComponent } from './user-change-pwd/user-change-pwd.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';

/**
 * Routes used in the app
 */
const ROUTE_CONFIG: Routes = [
    {
        path: 'user',
        component: UserOverviewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user/profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user/change_pwd',
        component: UserChangePwdComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTE_CONFIG)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule { }