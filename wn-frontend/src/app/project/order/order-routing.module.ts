// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../../user/auth-guard.service';
import { OrderSearchComponent } from './order-search/order-search.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

/**
 * Routes used in the app
 */
const ROUTE_CONFIG: Routes = [
    {
        path: 'order',
        component: OrderSearchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'order/edit',
        component: OrderEditComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTE_CONFIG)
    ],
    exports: [RouterModule]
})
export class OrderRoutingModule { }