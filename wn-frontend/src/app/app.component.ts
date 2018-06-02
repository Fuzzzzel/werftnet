import { Component, OnInit } from '@angular/core'
import { CoreDataService } from './core/core-data.service'
import { UserService } from './user/user.service'
import { UtilService } from './core/util.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WerftNET Version 1.1'
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
        alert('Es ist ein Fehler beim automatischen Login aufgetreten')
      })
  }
}
