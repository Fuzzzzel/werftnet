import { TestBed, async, inject } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule, HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { User } from './user.model'
import { UserService } from './user.service'
import { UtilService } from '../core/util.service'
import { AuthGuardService } from './auth-guard.service'

describe('UserService', () => {

  const userResponse = new User()
  userResponse.id = 1
  userResponse.username = 'user'
  userResponse.roles.push('ROLE_USER')

  let service: UserService
  let backend: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            redirectTo: ''
          },
          {
            path: 'logout',
            redirectTo: ''
          }])
      ],
      providers: [
        UserService,
        UtilService,
        AuthGuardService
      ]
    })
    backend = TestBed.get(HttpTestingController)
    service = TestBed.get(UserService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should send a login request and login user', (done) => {

    service.loginUser({ username: 'user', password: 'user' })
      .then((data) => {
        expect(data.username).toEqual('user')
        expect(service.isLoggedIn()).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/login_check')
    expect(req.request.method).toBe("POST")
    req.flush(userResponse, { status: 200, statusText: 'OK' })
  })

  it('should send a login request and fail to login user (401)', (done) => {

    service.loginUser({ username: 'user', password: 'user' })
      .catch((data) => {
        done()
      })

    const req = backend.expectOne('/login_check')
    expect(req.request.method).toBe("POST")
    req.flush(userResponse, { status: 401, statusText: 'Not Authorised' })
  })

  it('should send a login request and fail to login user (404)', (done) => {

    service.loginUser({ username: 'user', password: 'user' })
      .catch((data) => {
        done()
      })

    const req = backend.expectOne('/login_check')
    expect(req.request.method).toBe("POST")
    req.flush(userResponse, { status: 404, statusText: 'Not Found' })
  })

  it('test for logged in user should return user with role ROLE_USER',
    async(() => {

      function resolve(data: User) {
        expect(data.username).toEqual('testuser')
        expect(service.isLoggedIn()).toBeTruthy()
        expect(service.userHasRole('ROLE_USER')).toBeTruthy()
      }

      service.testServerForLoggedInUser()
        .then((user) => {
          expect(user.id).toBeGreaterThan(0)
        })
      backend.expectOne('/get_logged_in_user').flush(userResponse, { status: 200, statusText: 'Ok' })
    })
  )

  it('test for logged in user should fail with no user logged in',
    async(() => {

      function reject(data: User) {
        expect(service.userHasRole('ROLE_USER')).toBeFalsy()
      }

      service.testServerForLoggedInUser()
        .catch((error) => {
          expect(error).toBeTruthy()
          expect(service.userHasRole('ROLE_USER')).toBeFalsy()
        })
      backend.expectOne('/get_logged_in_user').flush(null, { status: 404, statusText: 'Not Found' })
    })
  )

  it('test for logged in user should fail when user without id is returned',
    async(() => {
      service.testServerForLoggedInUser()
        .catch((error) => {
          expect(error).toBeTruthy()
        })
      backend.expectOne('/get_logged_in_user').flush({}, { status: 200, statusText: 'OK' })
    })
  )

  it('should login and logout', (done) => {
    service.loginUser({ username: 'testuser', password: 'testpass' })
      .then((user) => {
        expect(service.isLoggedIn()).toBeTruthy()
        service.logoutUser()
          .then(() => {
            expect(service.isLoggedIn()).toBeFalsy()
            done()
          })
        backend.expectOne('/logout').flush(null, { status: 200, statusText: 'Ok' })
      })
    backend.expectOne('/login_check').flush(userResponse, { status: 200, statusText: 'Ok' })
  })

  it('should fail to logout', (done) => {

    service.logoutUser()
      .catch((error) => {
        done()
      })
    backend.expectOne('/logout').flush(null, { status: 404, statusText: 'Not Found' })
  })
})
