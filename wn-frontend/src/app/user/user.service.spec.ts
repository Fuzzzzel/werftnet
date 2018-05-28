import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User } from './user.model';
import { UserService } from './user.service';
import { UtilService } from '../core/util.service';
import { AuthGuardService } from '../user/auth-guard.service';

describe('UserService', () => {

  const userResponse = new User();
  userResponse.id = 1;
  userResponse.username = 'testuser';
  userResponse.roles.push('ROLE_USER');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
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
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should send a login request',
    inject([UserService, HttpClient, HttpTestingController], (service: UserService, http: HttpClient, backend: HttpTestingController) => {

      service.loginUser({ username: 'tbrzuska', password: 'pipapole' }, null, null);

      backend.expectOne((req: HttpRequest<any>) => {
        const body = new HttpParams({ fromString: req.body });
        return req.url === '/login_check'
      }, 'POST __username and __password');

    })
  );

  it('should emit 200 and return a user object',
    async(inject([UserService, HttpTestingController],
      (userService: UserService, backend: HttpTestingController) => {

        function resolve(data: User) {
          expect(data.username).toEqual('testuser');
          expect(userService.isLoggedIn()).toBeTruthy()
        }

        userService.loginUser({ username: 'testuser', password: 'testpass' }, resolve, null);
        backend.expectOne('/login_check').flush(userResponse, { status: 200, statusText: 'Ok' });
      })
    )
  )

  it('should emit 401 and return error',
    async(inject([UserService, HttpTestingController],
      (userService: UserService, backend: HttpTestingController) => {

        function resolve(data: User) {
          expect(userService.isLoggedIn()).toBeFalsy()
        }

        userService.loginUser({ username: 'testuser', password: 'testpass' }, resolve, null);
        backend.expectOne('/login_check').flush(userResponse, { status: 401, statusText: 'Unauthorized' });
      })
    )
  )

  it('test for logged in user should return user with role ROLE_USER',
    async(inject([UserService, HttpTestingController],
      (userService: UserService, backend: HttpTestingController) => {

        function resolve(data: User) {
          expect(data.username).toEqual('testuser');
          expect(userService.isLoggedIn()).toBeTruthy()
          expect(userService.userHasRole('ROLE_USER')).toBeTruthy()
        }

        userService.testServerForLoggedInUser()
          .then((user) => {
            expect(user.id).toBeGreaterThan(0)
          })
        backend.expectOne('/get_logged_in_user').flush(userResponse, { status: 200, statusText: 'Ok' });
      })
    )
  )

  it('test for logged in user should fail with no user logged in',
    async(inject([UserService, HttpTestingController],
      (userService: UserService, backend: HttpTestingController) => {

        function reject(data: User) {
          expect(userService.userHasRole('ROLE_USER')).toBeFalsy()
        }

        userService.testServerForLoggedInUser()
          .catch((error) => {
            expect(error).toBeTruthy()
          })
        backend.expectOne('/get_logged_in_user').flush(null, { status: 404, statusText: 'Not Found' });
      })
    )
  )

  it('should login and logout',
    async(inject([UserService, HttpTestingController],
      (userService: UserService, backend: HttpTestingController) => {

        function resolveLogout() {
          expect(userService.isLoggedIn()).toBeFalsy();
        }

        function resolveLogin(data: User) {
          expect(userService.isLoggedIn()).toBeTruthy()
          userService.logoutUser(resolveLogout, null);
          backend.expectOne('/logout').flush(null, { status: 200, statusText: 'Ok' });
        }

        userService.loginUser({ username: 'testuser', password: 'testpass' }, resolveLogin, null);
        backend.expectOne('/login_check').flush(userResponse, { status: 200, statusText: 'Ok' });
      })
    )
  )
});
