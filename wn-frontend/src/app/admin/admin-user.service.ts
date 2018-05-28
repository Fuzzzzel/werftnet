import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../core/util.service';

@Injectable()
export class AdminUserService {

  private $userList: BehaviorSubject<User[]>;

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) {
    this.$userList = <BehaviorSubject<User[]>>new BehaviorSubject([]);
    this.fetchAllUsers();
  }

  getUserList() {
    return this.$userList.asObservable();
  }

  fetchAllUsers() {
    return new Promise<User[]>((resolve, reject) => {
      // Set up post request
      const req = this.http.get<User[]>(
        '/admin/users'
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          this.$userList.next(data);
          resolve(data)
        },
        error => {
          reject(error)
        });
    })
  }

}
