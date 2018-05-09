// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './layout/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthGuardService as AuthGuard } from './user/auth-guard.service';

/**
 * Routes used in the app
 */
const ROUTE_CONFIG: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        redirectTo: '/login'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule'
    }
    /*,
    // Needs to be imported last, otherwise it overrides all other routes
    {
        path: '**',
        redirectTo: '/home'
    }
    */
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTE_CONFIG, {
            useHash: true,
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }