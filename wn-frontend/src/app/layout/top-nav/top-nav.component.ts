import { Component, OnInit } from '@angular/core'
import { UserService } from '../../user/user.service'

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  isNavbarCollapsed = true

  constructor(
    private userService: UserService
  ) { }

  userHasRole(role: string) {
    return this.userService.userHasRole(role)
  }

  isUserLoggedIn() {
    return this.userService.isLoggedIn()
  }

  logoutUser() {
    this.userService.logoutUser()
      .then(() => {
        // Do nothing, service redirects to login page already
      })
      .catch((error) => {
        alert('Es ist ein Fehler beim Logout aufgetreten');
      })
  }

  ngOnInit() {
  }

}
