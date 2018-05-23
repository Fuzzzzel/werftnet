import { TestBed, inject } from '@angular/core/testing';

import { AdminUserEditService } from './admin-user-edit.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminUserService } from '../admin-user.service';
import { UtilService } from '../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../../user/user.model';

describe('AdminUserEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AdminUserEditService,
        AdminUserService,
        UtilService
      ]
    });
  });
  it('should be created', inject([AdminUserEditService, HttpTestingController], (service: AdminUserEditService, backend: HttpTestingController) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch user', inject([AdminUserEditService, HttpTestingController], (service: AdminUserEditService, backend: HttpTestingController) => {
    const userId = 1
    service.fetchUser(userId)

    const req = backend.expectOne('/admin/users/' + userId);
    expect(req.request.method).toBe("GET");
    req.flush(new User(), { status: 200, statusText: 'Ok' });
  }));

  it('should save user', inject([AdminUserEditService, HttpTestingController], (service: AdminUserEditService, backend: HttpTestingController, done) => {
    let user = new User()
    user.id = 1

    service.saveUser(user)
      .then((data) => {
        expect(data).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/users/' + user.id);
    expect(req.request.method).toBe("POST");
    req.flush(user, { status: 200, statusText: 'Ok' });

  }));

  it('should change user password', inject([AdminUserEditService, HttpTestingController], (service: AdminUserEditService, backend: HttpTestingController, done) => {
    let user = new User()
    user.id = 1

    service.fetchUser(user.id).then((data) => {
      service.changeUserPwd('TestPassword')
        .then((data) => {
          expect(data).toBeTruthy()
          done()
        })

      const req2 = backend.expectOne('/admin/users/' + user.id + '/password');
      expect(req2.request.method).toBe("POST");
      req2.flush(user, { status: 200, statusText: 'Ok' });
    })


    setTimeout(() => {
      const req1 = backend.expectOne('/admin/users/' + user.id);
      expect(req1.request.method).toBe("GET");
      req1.flush([user], { status: 200, statusText: 'Ok' });
    }, 100)

  }));
});
