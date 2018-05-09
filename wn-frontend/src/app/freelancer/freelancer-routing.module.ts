// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../user/auth-guard.service';
import { FreelancerSearchComponent } from './freelancer-search/freelancer-search.component'
import { FreelancerEditComponent } from './freelancer-edit/freelancer-edit.component';

/**
 * Routes used in the app
 */
const ROUTE_CONFIG: Routes = [
    {
        path: 'freelancer',
        component: FreelancerSearchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'freelancer/edit',
        component: FreelancerEditComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTE_CONFIG)
    ],
    exports: [RouterModule]
})
export class FreelancerRoutingModule { }