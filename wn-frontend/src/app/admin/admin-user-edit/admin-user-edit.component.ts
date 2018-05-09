import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../user/user.model';
import { AdminUserEditService } from './admin-user-edit.service';
import { UtilService } from '../../core/util.service';
import { CoreData, CoreDataService } from '../../core/core-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.scss']
})
export class AdminUserEditComponent implements OnInit {

  userToEdit: User = new User();
  pwdNew: String = '';
  coreData: CoreData = new CoreData();
  submittedForm: boolean = false;
  submittedPw: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private coreDataService: CoreDataService,
    private adminUserEditService: AdminUserEditService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.coreDataService.getData().subscribe(
      (data) => { this.coreData = data }
    )

    this.adminUserEditService.getObservableUser().subscribe(
      (user) => { this.userToEdit = user, console.log(user) }
    )

    this.adminUserEditService.clearUser();
    this.route.params.subscribe(params => {
      const userId = +params['userId'];
      if (userId > 0) {
        this.adminUserEditService.fetchUser(userId);
      }
    });

  }

  changeUserPwd(uderEditPwdForm) {
    if (uderEditPwdForm.invalid) {
      alert('Eingegebenes Passwort entspricht nicht den Richtlinien (min. 4 Zeichen)');
      return;
    };

    if (!(this.userToEdit.id > 0)) {
      alert('User hat keine Id');
      return;
    }

    this.adminUserEditService.changeUserPwd(this.pwdNew)
      .then((user) => {
        this.util.historyBack();
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  saveUser(userForm) {
    this.submittedForm = true;
    if (!userForm.valid) {
      alert('Bitte alle Pflichtfelder ausfüllen!');
    } else {
      this.adminUserEditService.saveUser(this.userToEdit)
        .then((user) => {
          this.util.historyBack();
        })
        .catch((error) => {
          alert(error.message);
        })
    }
  }

  deleteUser() {

  }

  cancelEdit() {
    this.util.historyBack();
  }

}
