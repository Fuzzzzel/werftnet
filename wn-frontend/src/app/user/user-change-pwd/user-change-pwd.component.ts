import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { UtilService } from '../../core/util.service';

@Component({
  selector: 'app-user-change-pwd',
  templateUrl: './user-change-pwd.component.html',
  styleUrls: ['./user-change-pwd.component.scss']
})
export class UserChangePwdComponent implements OnInit {

  public pwdOld: string
  public pwdNew: string
  public pwdNewRepeated: string
  public currentUser: User
  public formSubmitted: boolean = false
  public errorMessage: string = null

  constructor(
    private userService: UserService,
    private util: UtilService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser()
  }

  setNewPassword(pwdForm) {
    this.formSubmitted = true
    this.errorMessage = null
    this.userService.setNewPassword(this.pwdOld, this.pwdNew)
      .then((user) => {
        alert('Passwort wurde erfolgreich geändert')
        this.util.historyBack()
      })
      .catch((err) => {
        this.errorMessage = err.error
      })
  }

  goBack() {
    this.util.historyBack()
  }

}
