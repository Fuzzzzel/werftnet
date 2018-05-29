import { TestBed, inject } from '@angular/core/testing';

import { AdminUserEditService } from './admin-user-edit.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminUserService } from '../admin-user.service';
import { UtilService } from '../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../../user/user.model';

describe('AdminUserEditService', () => {
  let service: AdminUserEditService
  let backend: HttpTestingController
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
    service = TestBed.get(AdminUserEditService)
    backend = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user', () => {
    const userId = 1
    service.fetchUser(userId)

    const req = backend.expectOne('/admin/users/' + userId);
    expect(req.request.method).toBe("GET");
    req.flush(new User(), { status: 200, statusText: 'Ok' });
  });

  it('should fail to fetch user', (done) => {
    const userId = 134
    service.fetchUser(userId)
      .catch((error) => {
        done()
      })

    const req = backend.expectOne('/admin/users/' + userId);
    expect(req.request.method).toBe("GET");
    req.flush(null, { status: 404, statusText: '404 Not Found' });
  });

  it('should not fetch user when id is missing', (done) => {
    service.fetchUser(null).catch((err) => {
      expect(err).toBeTruthy()
      done()
    })
  });

  it('should save user', (done) => {
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
  });

  it('should fail to save user', (done) => {
    let user = new User()
    user.id = 123

    service.saveUser(user)
      .catch((error) => {
        done()
      })

    const req = backend.expectOne('/admin/users/' + user.id);
    expect(req.request.method).toBe("POST");
    req.flush(null, { status: 404, statusText: '404 Not Found' });
  });

  it('should change user password', (done) => {
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
    }, 50)
  });

  it('should fail to change user password', (done) => {
    let user = new User()
    user.id = 123

    service.fetchUser(user.id).then((data) => {
      service.changeUserPwd('TestPassword')
        .catch((error) => {
          done()
        })

      const req2 = backend.expectOne('/admin/users/' + user.id + '/password');
      expect(req2.request.method).toBe("POST");
      req2.flush(null, { status: 404, statusText: 'Not Found' });
    })

    setTimeout(() => {
      const req1 = backend.expectOne('/admin/users/' + user.id);
      expect(req1.request.method).toBe("GET");
      req1.flush([user], { status: 200, statusText: 'Ok' });
    }, 50)
  });

  it('should not change userPwd when id is missing', (done) => {
    service.changeUserPwd(null).catch((err) => {
      expect(err).toBeTruthy()
      done()
    })
  });


});
