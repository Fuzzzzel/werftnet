import { async, ComponentFixture, TestBed } from '@angular/core/testing'

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
import { Observable } from 'rxjs'

describe('AdminUserEditComponent', () => {
  let component: AdminUserEditComponent
  let fixture: ComponentFixture<AdminUserEditComponent>
  let backend: HttpTestingController
  let adminUserEditService: AdminUserEditService
  let activatedRoute: ActivatedRoute

  beforeEach(async(() => {
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
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.params = Observable.of({ userId: 1 })
    fixture.detectChanges()
  }))

  function initWithUser() {
    let user = new User()
    user.id = 1
    const req = backend.expectOne('/admin/users/' + user.id)
    expect(req.request.method).toBe("GET")
    req.flush(user, { status: 200, statusText: 'Ok' })
  }

  function initWithoutUser() {
    const req = backend.expectOne('/admin/users/')
    expect(req.request.method).toBe("GET")
    req.flush(new User(), { status: 200, statusText: 'Ok' })
  }

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fail to init', () => {
    let user = new User()
    user.id = 1
    spyOn(window, 'alert').and.returnValue(true)
    const req = backend.expectOne('/admin/users/' + user.id)
    expect(req.request.method).toBe("GET")
    req.flush(user, { status: 404, statusText: 'not found' })
  })

  it('should change user password', (done) => {
    initWithUser()
    let userEditPwdForm = { valid: true }
    component.pwdNew = 'New password'
    component.userToEdit = new User()
    component.userToEdit.id = 1
    adminUserEditService.fetchUser(component.userToEdit.id).then((data) => {
      component.changeUserPwd(userEditPwdForm)
        .then(() => {
          done()
        })

      const req = backend.expectOne('/admin/users/' + component.userToEdit.id + '/password')
      expect(req.request.method).toBe("POST")
      req.flush(new User(), { status: 200, statusText: 'OK' })
    })

    setTimeout(() => {
      const req1 = backend.expectOne('/admin/users/' + component.userToEdit.id)
      expect(req1.request.method).toBe("GET")
      req1.flush([component.userToEdit], { status: 200, statusText: 'Ok' })
    }, 25)
  })

  it('should fail to change user password', (done) => {
    initWithUser()
    let userEditPwdForm = { invalid: true }
    component.pwdNew = 'New password'
    component.userToEdit = new User()
    component.userToEdit.id = null

    adminUserEditService.fetchUser(1)
      .then(() => {
        spyOn(window, 'alert').and.returnValue(true)
        component.changeUserPwd(userEditPwdForm)
          .catch(() => {
            // Error: Eingegebenes Password
            userEditPwdForm.invalid = false
            component.changeUserPwd(userEditPwdForm)
              .catch(() => {
                // Error: User hat keine Id
                component.userToEdit.id = 1
                component.changeUserPwd(userEditPwdForm)
                  .catch((error) => {
                    // Error 404
                    done()
                  })

                const req = backend.expectOne('/admin/users/' + component.userToEdit.id + '/password')
                expect(req.request.method).toBe("POST")
                req.flush(null, { status: 404, statusText: 'Not Found' })
              })
          })
      })
    setTimeout(() => {
      const req1 = backend.expectOne('/admin/users/' + 1)
      expect(req1.request.method).toBe("GET")
      req1.flush([component.userToEdit], { status: 200, statusText: 'Ok' })
    }, 25)
  })

  it('should save user', (done) => {
    initWithUser()
    let userForm = { valid: true }
    component.pwdNew = 'New password'
    component.userToEdit = new User()
    component.userToEdit.id = 1

    component.saveUser(userForm)
      .then(() => {
        done()
      })

    const req = backend.expectOne('/admin/users/' + component.userToEdit.id)
    expect(req.request.method).toBe("POST")
    req.flush(new User(), { status: 200, statusText: 'Ok' })
  })

  it('should fail to save user', (done) => {
    initWithUser()
    let userForm = { valid: false }
    component.pwdNew = 'New password'
    component.userToEdit = new User()
    component.userToEdit.id = 1

    // Error: Nicht alle Pflichtangaben gemacht
    spyOn(window, 'alert').and.returnValue(true)
    component.saveUser(userForm)
      .catch(() => {
        // Error: No route
        userForm = { valid: true }
        component.saveUser(userForm)
          .catch(() => {
            done()
          })

        const req = backend.expectOne('/admin/users/' + component.userToEdit.id)
        expect(req.request.method).toBe("POST")
        req.flush(new User(), { status: 404, statusText: 'Not Found' })
      })

  })

  it('should delete user', () => {
    initWithUser()
    component.deleteUser()
  })

  it('should cancel edit', () => {
    initWithUser()
    component.cancelEdit()
  })
})
