import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (this.userService.isLoggedIn()) {
      if (expectedRole) {
        return this.userService.userHasRole(expectedRole);
      }
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
