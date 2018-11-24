import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { resolve } from 'q';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedRole = route.data.expectedRole;

    return new Promise((resolve, reject) => {
      this.userService.checkIfLoggedIn()
        .then(() => {

          if (expectedRole) {
            const hasRole = this.userService.userHasRole(expectedRole);
            resolve(hasRole)
          } else {
            resolve(true)
          }
        })
        .catch(() => {
          resolve(false)
          this.router.navigate(['login'])
        })
    })

  }
}
