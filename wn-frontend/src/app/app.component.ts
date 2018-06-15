import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { CoreDataService } from './core/core-data.service'
import { UserService } from './user/user.service'
import { UtilService } from './core/util.service'
import { environment } from '../../environment'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public version: string = environment.VERSION
  title = 'WerftNET Version ' + this.version
  coreDataLoaded: Boolean = false

  constructor(
    private coreDataService: CoreDataService,
    private userService: UserService,
    private util: UtilService
  ) {

  }

  isUserLoggedIn() {
    return this.userService.isLoggedIn()
  }

  userHasRole(role: string) {
    return this.userService.userHasRole(role)
  }

  ngOnInit() {
    this.coreDataService.getDataLoaded().subscribe(dataLoaded => {
      this.coreDataLoaded = dataLoaded
    })
    this.userService.testServerForLoggedInUser()
      .then((user) => {
        this.util.goTo('home')
      })
      .catch((error) => {
        this.util.goTo('login')
      })
  }
}
