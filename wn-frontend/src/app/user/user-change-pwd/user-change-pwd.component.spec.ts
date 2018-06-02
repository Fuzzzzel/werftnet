import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserChangePwdComponent } from './user-change-pwd.component'
import { SharedModule } from '../../shared/shared.module'
import { UtilService } from '../../core/util.service'
import { UserService } from '../user.service'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { User } from '../user.model'

describe('UserChangePwdComponent', () => {
  let component: UserChangePwdComponent
  let fixture: ComponentFixture<UserChangePwdComponent>
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        UtilService,
        UserService
      ],
      declarations: [UserChangePwdComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(UserChangePwdComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should go back one page', () => {
    component.goBack()
  })

  it('should set new password for user', (done) => {
    const pwdForm = {}
    const user = new User()
    user.id = 1
    component.pwdOld = 'OldPwd'
    component.pwdOld = 'NewPwd'

    spyOn(window, 'alert').and.returnValue(true)
    component.setNewPassword(pwdForm)
      .then(() => {
        done()
      })

    const req = backend.expectOne('/user/change_pwd')
    expect(req.request.method).toBe("POST")
    req.flush([user], { status: 200, statusText: 'Ok' })
  })

  it('should fail to set new password for user', (done) => {
    const pwdForm = {}
    const user = new User()
    user.id = 1
    component.pwdOld = 'OldPwd'
    component.pwdOld = 'NewPwd'

    spyOn(window, 'alert').and.returnValue(true)
    component.setNewPassword(pwdForm)
      .catch(() => {
        done()
      })

    const req = backend.expectOne('/user/change_pwd')
    expect(req.request.method).toBe("POST")
    req.flush([user], { status: 404, statusText: 'Not Found' })
  })
})
