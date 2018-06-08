import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { User } from './user.model';
import { UtilService } from '../core/util.service';

@Injectable()
export class UserService {

  private user: User = new User();

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) { }

  getCurrentUser(): User {
    return this.user
  }

  isLoggedIn(): boolean {
    return typeof this.user.id !== 'undefined' && typeof this.user.username !== 'undefined' && this.user.id !== null && this.user.username !== null;
  }

  userHasRole(role: string) {
    return this.user.hasRole(role);
  }

  /**
   * Validate credentials with server and receive webtoken
   */
  loginUser(credentials): Promise<User> {
    const formData = new FormData();
    formData.append('_username', credentials.username)
    formData.append('_password', credentials.password)
    formData.append('_remember_me', 'true')

    // Set up post request
    const req = this.http.post<User>(
      '/login_check',
      formData
    )

    return new Promise<User>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          this.user.clearData();

          this.user.id = data.id;
          this.user.username = data.username;
          this.user.roles = data.roles;

          resolve(data);
        },
        error => {
          this.user.clearData();
          if (error.status === 401) {
            error.message = 'Kombination aus Benutzername und Passwort ist unbekannt';
          } else {
            error.message = 'Es ist ein Fehler beim Login aufgetreten'
          }
          reject(error);
        });
    })
  }

  /**
   * Logging out clears the user and redirects to main page.
   *
   */
  logoutUser(): Promise<void> {
    // Set up request
    const req = this.http.get<void>(
      '/logout'
    )

    return new Promise<void>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          this.user.clearData();

          resolve(data);

          // Navigate to main page
          this.util.goTo('logout');
        },
        error => {
          reject(error);
        });
    })
  }

  /**
   * Tests the server firewall for the user logged in with this
   * session and sets the user if it is logged in and returned.
   * 
   * @param resolve 
   * @param reject 
   */
  testServerForLoggedInUser() {

    return new Promise<User>((resolve, reject) => {
      // Set up post request
      const req = this.http.get<User>(
        '/get_logged_in_user'
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          if (data.id) {
            this.user.id = data.id;
            this.user.username = data.username;
            this.user.roles = data.roles;
            resolve(data);
          } else {
            reject(new Error('No user was found'))
          }
        },
        error => {
          reject(error);
        });
    })
  }

  setNewPassword(oldPassword, newPassword): Promise<User> {

    return new Promise((resolve, reject) => {
      // Set up post request
      const req = this.http.post<User>(
        '/user/change_pwd',
        {
          pwd_old: oldPassword,
          pwd_new: newPassword
        }
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          this.user.id = data.id;
          this.user.username = data.username;
          this.user.roles = data.roles;

          resolve(this.user);
        },
        error => {
          reject(error);
        });
    })
  }

}
