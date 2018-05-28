import { TestBed, inject } from '@angular/core/testing';

import { AdminUserService } from './admin-user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UtilService } from '../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../user/user.model';

describe('AdminUserService', () => {
  let service: AdminUserService
  let backend: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AdminUserService,
        UtilService
      ]
    });
    service = TestBed.get(AdminUserService)
    backend = TestBed.get(HttpTestingController)
  });

  it('should be created', inject([AdminUserService], (service: AdminUserService) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch users', (done) => {
    let req = backend.expectOne('/admin/users');
    expect(req.request.method).toBe("GET");
    req.flush([new User()], { status: 200, statusText: 'Ok' });

    expect(service.getUserList())
    service.fetchAllUsers()
      .then((users) => {
        expect(users).toBeTruthy()
        done()
      })
      .catch((error) => {
        throw new Error('Laden der User hat nicht funktioniert')
      })
    req = backend.expectOne('/admin/users');
    expect(req.request.method).toBe("GET");
    req.flush([new User()], { status: 200, statusText: 'Ok' });

  });

});
