// Angular modules and components
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Router, Routes } from '@angular/router'

// Third party modules and components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

// Own modules
import { AppRoutingModule } from './app-routing.module'
import { SharedModule } from './shared/shared.module'
import { CoreModule } from './core/core.module'
import { UserModule } from './user/user.module'
import { FreelancerModule } from './freelancer/freelancer.module'
import { CustomerModule } from './customer/customer.module'
import { ProjectModule } from './project/project.module'
// import { AdminModule } from './admin/admin.module'

// Own components
import { AppComponent } from './app.component'
import { LoginComponent } from './layout/login/login.component'
import { HomeComponent } from './layout/home/home.component'
import { TopNavComponent } from './layout/top-nav/top-nav.component'
import { SystemInfoService } from './admin/system/system-info.service'
import { AdminSystemImprintComponent } from './admin/system/admin-system-imprint/admin-system-imprint.component'
import { OrderModule } from './project/order/order.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    AppRoutingModule,
    // AdminModule,
    UserModule,
    FreelancerModule,
    CustomerModule,
    ProjectModule,
    NgxUiLoaderModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TopNavComponent,
    AdminSystemImprintComponent
  ],
  providers: [
    SystemInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
