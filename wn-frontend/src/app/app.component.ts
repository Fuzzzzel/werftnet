import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { CoreDataService } from './core/core-data.service'
import { UserService } from './user/user.service'
import { UtilService } from './core/util.service'
import { environment } from '../../environment'
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public version: string = environment.VERSION
  title = 'WerftNET Version ' + this.version

  constructor(
    private coreDataService: CoreDataService,
    private userService: UserService,
    private util: UtilService,
    private ngxUiLoaderService: NgxUiLoaderService
  ) {

  }

  isUserLoggedIn() {
    return this.userService.isLoggedIn()
  }

  userHasRole(role: string) {
    return this.userService.userHasRole(role)
  }

  ngOnInit() {
    this.ngxUiLoaderService.start()
    this.coreDataService.getDataLoaded().subscribe(dataLoaded => {
      this.ngxUiLoaderService.stop()
    })
    this.userService.checkIfLoggedIn()
      .then(() => {
      })
      .catch(() => {
        this.util.goTo('login')
      })
  }

  ngOnDestroy() {
    this.ngxUiLoaderService.stop()
  }
}
