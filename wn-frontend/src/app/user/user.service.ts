import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { User } from './user.model';
import { UtilService } from '../core/util.service';

@Injectable()
export class UserService {

  private user: User = new User();

  loginError = {
    message: ''
  };

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) {
    /*
    this.user$ = of(this.user);
    this.user$.subscribe(() => {
      if (!this.isLoggedIn()) {
        this.util.goTo('login');
      }
    })
    */
  }

  getCurrentUser(): User {
    return this.user
  }

  isLoggedIn(): boolean {
    return typeof this.user.id !== 'undefined' && typeof this.user.username !== 'undefined' && this.user.id !== null && this.user.username !== null;
  }

  getLoginError(): Observable<{ message: string }> {
    return of(this.loginError);
  }

  userHasRole(role: string) {
    return this.user.hasRole(role);
  }

  /**
   * Validate credentials with server and receive webtoken
   */
  loginUser(credentials, resolve, reject): void {
    const formData = new FormData();
    formData.append('_username', credentials.username)
    formData.append('_password', credentials.password)
    formData.append('_remember_me', 'true')

    // Set up post request
    const req = this.http.post<User>(
      '/login_check',
      formData
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.user.clearData();

        this.user.id = data.id;
        this.user.username = data.username;
        this.user.roles = data.roles;

        this.loginError.message = '';

        // Navigate to main page
        this.util.goTo('home');
        console.log(data);

        resolve && resolve(data);
      },
      error => {
        this.user.clearData();
        if (error.status === 401) {
          this.loginError.message = 'Kombination aus Benutzername und Passwort ist unbekannt';
        }
        reject && reject(error);
      });

    return
  }

  /**
   * Logging out clears the user and redirects to main page.
   *
   */
  logoutUser(resolve, reject): void {
    // Set up request
    const req = this.http.get<void>(
      '/logout'
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.user.clearData();

        // Navigate to main page
        this.util.goTo('logout');

        resolve && resolve(data);
      },
      error => {
        alert('Es ist ein Fehler beim Logout aufgetreten');
        reject && reject(error);
      });
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

          resolve && resolve(this.user);
        },
        error => {
          reject && reject(error);
        });
    })
  }

}
