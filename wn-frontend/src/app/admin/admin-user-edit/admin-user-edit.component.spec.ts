import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'

import { AdminUserEditComponent } from './admin-user-edit.component'
import { SharedModule } from '../../shared/shared.module'
import { RouterTestingModule } from '@angular/router/testing'
import { CoreDataServiceMock } from '../../core/core-data.service-mock'
import { CoreDataService } from '../../core/core-data.service'
import { UtilService } from '../../core/util.service'
import { AdminUserService } from '../admin-user.service'
import { AdminUserEditService } from './admin-user-edit.service'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { User } from '../../user/user.model'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

describe('AdminUserEditComponent', () => {
  let component: AdminUserEditComponent
  let fixture: ComponentFixture<AdminUserEditComponent>
  let backend: HttpTestingController
  let adminUserEditService: AdminUserEditService
  let activatedRoute: ActivatedRoute

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        UtilService,
        AdminUserService,
        AdminUserEditService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ],
      declarations: [AdminUserEditComponent]
    })
      .compileComponents()
    backend = TestBed.get(HttpTestingController)
    adminUserEditService = TestBed.get(AdminUserEditService)

    fixture = TestBed.createComponent(AdminUserEditComponent)
    component = fixture.componentInstance

    tick()
  }))

  function initWithUser() {
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.params = of({ userId: 1 })
    fixture.detectChanges()

    let user = new User()
    user.id = 1
    const req = backend.expectOne('/admin/users/' + user.id)
    expect(req.request.method).toBe("GET")
    req.flush(user, { status: 200, statusText: 'Ok' })
  }

  function initWithoutUser() {
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.params = of({})
    fixture.detectChanges()
  }

  function initFail() {
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.params = of({ userId: 1 })
    fixture.detectChanges()

    let user = new User()
    user.id = 1
    const req = backend.expectOne('/admin/users/' + user.id)
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }

  it('should create', fakeAsync(() => {
    initWithoutUser()
    expect(component).toBeTruthy()
  }))

  it('should fail to init', fakeAsync(() => {
    spyOn(window, 'alert').and.returnValue(true)
    tick()
    initFail()
  }))

  it('should change user password', fakeAsync(() => {
    initWithUser()
    let userEditPwdForm = { valid: true }
    component.pwdNew = 'New password'

    component.changeUserPwd(userEditPwdForm)
    tick()

    const req = backend.expectOne('/admin/users/' + component.userToEdit.id + '/password')
    expect(req.request.method).toBe("POST")
    req.flush(new User(), { status: 200, statusText: 'OK' })
  }))

  it('should fail to change user password', fakeAsync(() => {
    initWithUser()
    let userEditPwdForm = { invalid: true }
    component.pwdNew = 'New password'
    component.userToEdit.id = null

    tick()
    spyOn(window, 'alert').and.returnValue(true)

    // Error: Eingegebenes Password
    component.changeUserPwd(userEditPwdForm)
    tick()

    // Error: User hat keine Id
    userEditPwdForm.invalid = false
    component.changeUserPwd(userEditPwdForm)
    tick()

    // Error 404
    component.userToEdit.id = 1
    component.changeUserPwd(userEditPwdForm)
    tick()

    const req2 = backend.expectOne('/admin/users/' + component.userToEdit.id + '/password')
    expect(req2.request.method).toBe("POST")
    req2.flush(null, { status: 404, statusText: 'Not Found' })
  }))

  it('should save user', fakeAsync(() => {
    initWithUser()
    let userForm = { valid: true }
    component.pwdNew = 'New password'

    component.saveUser(userForm)
    tick()

    const req = backend.expectOne('/admin/users/' + component.userToEdit.id)
    expect(req.request.method).toBe("POST")
    req.flush(new User(), { status: 200, statusText: 'Ok' })
    tick()
  }))

  it('should fail to save user', fakeAsync(() => {
    initWithUser()
    let userForm = { valid: false }

    // Error: Passwort zu kurz
    spyOn(window, 'alert').and.returnValue(true)
    component.userToEdit['password'] = '12'
    component.saveUser(userForm)

    // Error: Nicht alle Pflichtangaben gemacht
    component.userToEdit['password'] = '1234'
    component.saveUser(userForm)

    // Error: No route
    userForm = { valid: true }
    component.saveUser(userForm)
    tick()

    const req = backend.expectOne('/admin/users/' + component.userToEdit.id)
    expect(req.request.method).toBe("POST")
    req.flush(new User(), { status: 404, statusText: 'Not Found' })
  }))

  it('should delete user', fakeAsync(() => {
    initWithUser()

    component.deleteUser()
    tick()

    const req = backend.expectOne('/admin/users/' + component.userToEdit.id)
    expect(req.request.method).toBe("DELETE")
    req.flush(new User(), { status: 200, statusText: 'OK' })
  }))

  it('should fail to delete user', fakeAsync(() => {
    initWithUser()
    spyOn(window, 'alert').and.returnValue(true)
    component.deleteUser()
    tick()

    const req = backend.expectOne('/admin/users/' + component.userToEdit.id)
    expect(req.request.method).toBe("DELETE")
    req.flush(new User(), { status: 404, statusText: 'Not Found' })
  }))

  it('should cancel edit', fakeAsync(() => {
    initWithUser()
    component.cancelEdit()
    tick()
  }))
})
