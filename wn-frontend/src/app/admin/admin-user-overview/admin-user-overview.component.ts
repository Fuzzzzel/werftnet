import { Component, OnInit } from '@angular/core'
import { AdminUserService } from '../admin-user.service'
import { BehaviorSubject } from 'rxjs'
import { User } from '../../user/user.model'
import { UtilService } from '../../core/util.service'
import { AdminUserEditService } from '../admin-user-edit/admin-user-edit.service'

@Component({
  selector: 'app-admin-user-overview',
  templateUrl: './admin-user-overview.component.html',
  styleUrls: ['./admin-user-overview.component.scss']
})
export class AdminUserOverviewComponent implements OnInit {

  userList: User[] = []

  constructor(
    private adminUserService: AdminUserService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.adminUserService.getUserList().subscribe((userList) => {
      this.userList = userList
    })
  }

  editUser(userId) {
    this.util.goTo('admin/usermanagement/edit_user/' + userId)
  }

}
