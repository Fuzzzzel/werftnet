import { TestBed, inject } from '@angular/core/testing'

import { AuthGuardService } from './auth-guard.service'
import { UserService } from './user.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UtilService } from '../core/util.service'
import { RouterTestingModule } from '@angular/router/testing'
import { User } from './user.model';

describe('AuthGuardService', () => {
  let mockSnapshot = jasmine.createSpyObj("RouterStateSnapshot", ['toString'])

  let service: AuthGuardService
  let userService: UserService
  let backend: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            redirectTo: ''
          }
        ])
      ],
      providers: [
        AuthGuardService,
        UserService,
        UtilService
      ]
    })
    service = TestBed.get(AuthGuardService)
    userService = TestBed.get(UserService)
    backend = TestBed.get(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return not activated, when no user is logged in and empty object is received', (done) => {
    mockSnapshot.data = {
      expectedRole: 'ROLE_USER'
    }

    let userResponse = {}

    service.canActivate(mockSnapshot)
      .then((data) => {
        expect(data).toBeFalsy()
        done()
      })

    const req = backend.expectOne('/get_logged_in_user')
    expect(req.request.method).toBe("GET")
    req.flush(userResponse, { status: 200, statusText: 'OK' })
  })

  it('should return not activated, when no user is logged in and request fails', (done) => {
    mockSnapshot.data = {
      expectedRole: 'ROLE_USER'
    }

    let userResponse = {}

    service.canActivate(mockSnapshot)
      .then((data) => {
        expect(data).toBeFalsy()
        done()
      })

    const req = backend.expectOne('/get_logged_in_user')
    expect(req.request.method).toBe("GET")
    req.flush(userResponse, { status: 404, statusText: 'NOT FOUND' })
  })

  it('should not send request twice if first request has not been answered yet', (done) => {
    mockSnapshot.data = {
      expectedRole: 'ROLE_USER'
    }

    let userResponse = {}

    service.canActivate(mockSnapshot)
      .then((data) => {
        expect(data).toBeFalsy()
      })

    service.canActivate(mockSnapshot)
      .then((data) => {
        expect(data).toBeFalsy()
        done()
      })

    const req = backend.expectOne('/get_logged_in_user')
    expect(req.request.method).toBe("GET")
    req.flush(userResponse, { status: 200, statusText: 'OK' })
  })

  it('should return activated, when user is logged in and has role', (done) => {
    mockSnapshot.data = {
      expectedRole: 'ROLE_USER'
    }

    let userResponse = new User()
    userResponse.id = 1
    userResponse.username = 'user'
    userResponse.roles = ['ROLE_USER']

    userService.loginUser({ username: 'user', password: 'user' })
      .then((data) => {
        expect(data.username).toEqual('user')
        expect(userService.isLoggedIn()).toBeTruthy()
        service.canActivate(mockSnapshot)
          .then((data) => {
            expect(data).toBeTruthy()
            done()
          })
      })

    const req = backend.expectOne('/login_check')
    expect(req.request.method).toBe("POST")
    req.flush(userResponse, { status: 200, statusText: 'OK' })
  })

  it('should return activated, when user is logged in and no role needed', (done) => {
    mockSnapshot.data = {
    }

    let userResponse = new User()
    userResponse.id = 1
    userResponse.username = 'user'
    userResponse.roles = ['ROLE_USER']

    userService.loginUser({ username: 'user', password: 'user' })
      .then((data) => {
        expect(data.username).toEqual('user')
        expect(userService.isLoggedIn()).toBeTruthy()
        service.canActivate(mockSnapshot)
          .then((data) => {
            expect(data).toBeTruthy()
            done()
          })
      })

    const req = backend.expectOne('/login_check')
    expect(req.request.method).toBe("POST")
    req.flush(userResponse, { status: 200, statusText: 'OK' })
  })
})
