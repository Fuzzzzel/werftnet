import { Component, OnInit } from '@angular/core'
import { UserService } from '../../user/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string
  password: string
  loginError: { message: string }

  constructor(private userService: UserService) { }

  loginUser(username, password) {
    this.userService.loginUser({ username: username, password: password }, null, null)
  }

  ngOnInit() {
    this.userService.getLoginError()
      .subscribe(loginError => this.loginError = loginError)
  }

}
