import { Injectable } from '@angular/core';
import { User } from '../../user/user.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isNumber } from 'util';
import { AdminUserService } from '../admin-user.service';

@Injectable()
export class AdminUserEditService {
  private $userToEdit: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private adminUserService: AdminUserService
  ) {
    this.$userToEdit = <BehaviorSubject<User>>new BehaviorSubject(new User());
  }

  getObservableUser() {
    return this.$userToEdit.asObservable();
  }

  fetchUser(userId): Promise<User> {

    return new Promise(
      (resolve, reject) => {
        if (!userId) {
          reject('Es wurde keine User Id angegeben');
          return;
        }

        const req = this.http.get<User>(
          '/admin/users/' + userId
        )

        // Execute post request and subscribe to response
        req.subscribe(
          data => {
            const user = data[0]
            this.$userToEdit.next(user);
            resolve(user)
          },
          error => {
            reject('Fehler beim Laden des Users');
          });
      })
  }

  clearUser() {
    this.$userToEdit.next(new User());
  }

  saveUser(editedUser): Promise<User> {
    return new Promise(
      (resolve, reject) => {
        const req = this.http.post<any>(
          '/admin/users' + (editedUser.id > 0 ? '/' + editedUser.id : ''),
          editedUser
        )

        // Execute post request and subscribe to response
        req.subscribe(
          data => {
            this.$userToEdit.next(data);
            this.adminUserService.fetchAllUsers();
            resolve && resolve(data);
          },
          error => {
            reject && reject(error);
          });
      }
    )
  }

  changeUserPwd(newPwd): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        if (!(this.$userToEdit.getValue().id > 0)) {
          reject('Der User hat keine Id. Passwort kann nicht geändert werden');
          return
        }
        const req = this.http.post<any>(
          '/admin/users' + (this.$userToEdit.getValue().id > 0 ? '/' + this.$userToEdit.getValue().id : '') + '/password',
          newPwd
        )

        // Execute post request and subscribe to response
        req.subscribe(
          data => {
            this.$userToEdit.next(data);
            this.adminUserService.fetchAllUsers();
            resolve && resolve(data);
          },
          error => {
            reject && reject(error);
          });
      }
    );
  }
}
