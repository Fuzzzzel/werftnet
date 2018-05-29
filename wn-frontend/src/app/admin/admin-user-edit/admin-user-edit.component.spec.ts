import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserEditComponent } from './admin-user-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { CoreDataService } from '../../core/core-data.service';
import { UtilService } from '../../core/util.service';
import { AdminUserService } from '../admin-user.service';
import { AdminUserEditService } from './admin-user-edit.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../user/user.model';

describe('AdminUserEditComponent', () => {
  let component: AdminUserEditComponent;
  let fixture: ComponentFixture<AdminUserEditComponent>;
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        HttpTestingController,
        UtilService,
        AdminUserService,
        AdminUserEditService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ],
      declarations: [AdminUserEditComponent]
    })
      .compileComponents();
    backend = TestBed.get(HttpTestingController)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail to change user password', (done) => {
    let userEditPwdForm = { invalid: true }
    component.pwdNew = 'New password'
    component.userToEdit = new User()
    component.userToEdit.id = null

    // Error: Eingegebenes Password
    spyOn(window, 'confirm').and.returnValue(true);
    component.changeUserPwd(userEditPwdForm)

    // Error: User hat keine Id
    userEditPwdForm.invalid = false
    component.changeUserPwd(userEditPwdForm)

    // Error
    component.userToEdit.id = 1
    component.changeUserPwd(userEditPwdForm)

    done()
  })

  it('should fail to save user', (done) => {
    let userForm = { valid: false }
    component.pwdNew = 'New password'
    component.userToEdit = new User()
    component.userToEdit.id = 1

    // Error: Nicht alle Pflichtangaben gemacht
    spyOn(window, 'confirm').and.returnValue(true);
    component.saveUser(userForm)

    spyOn(window, 'alert').and.returnValue(true);
    // Error: No route
    userForm = { valid: true }
    component.userToEdit.id = 1
    component.saveUser(userForm)

    done()
  })

  it('should delete user', () => {
    component.deleteUser()
  })

  it('should cancel edit', () => {
    component.cancelEdit()
  })
});
