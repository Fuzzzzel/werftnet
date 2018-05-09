import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  isCollapsed: Boolean = false;

  constructor(
    private userService: UserService
  ) { }

  userHasRole(role: string) {
    return this.userService.userHasRole(role);
  }

  isUserLoggedIn() {
    return this.userService.isLoggedIn();
  }

  logoutUser() {
    return this.userService.logoutUser(null, null);
  }

  ngOnInit() {
  }

}
