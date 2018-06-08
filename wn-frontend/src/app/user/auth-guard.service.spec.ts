import { TestBed, inject } from '@angular/core/testing'

import { AuthGuardService } from './auth-guard.service'
import { UserService } from './user.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UtilService } from '../core/util.service'
import { RouterTestingModule } from '@angular/router/testing'
import { User } from './user.model';

describe('AuthGuardService', () => {
  let mockSnapshot = jasmine.createSpyObj("RouterStateSnapshot", ['toString'])
  mockSnapshot.data = {
    expectedRole: 'ROLE_USER'
  }
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

  it('should return not activated, when no user is logged in', () => {
    expect(service.canActivate(mockSnapshot)).toBeFalsy()
  })

  it('should return activated, when user is logged in', (done) => {
    let userResponse = new User()
    userResponse.id = 1
    userResponse.username = 'user'
    userResponse.roles = ['ROLE_USER']

    userService.loginUser({ username: 'user', password: 'user' })
      .then((data) => {
        expect(data.username).toEqual('user')
        expect(userService.isLoggedIn()).toBeTruthy()
        expect(service.canActivate(mockSnapshot)).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/login_check')
    expect(req.request.method).toBe("POST")
    req.flush(userResponse, { status: 200, statusText: 'OK' })
  })
})
