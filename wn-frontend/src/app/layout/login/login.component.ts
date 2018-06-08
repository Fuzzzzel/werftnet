import { Component, OnInit } from '@angular/core'
import { UserService } from '../../user/user.service'
import { UtilService } from '../../core/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string
  password: string
  loginError: string

  constructor(
    private userService: UserService,
    private util: UtilService) { }

  loginUser(username, password) {
    this.userService.loginUser({ username: username, password: password })
      .then(() => {
        // Navigate to main page
        this.loginError = ''
        this.util.goTo('home');
      })
      .catch((error) => {
        this.loginError = error.message
      })
  }

  ngOnInit() {

  }

}
