import { TestBed, inject } from '@angular/core/testing';

import { AdminUserEditService } from './admin-user-edit.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminUserService } from '../admin-user.service';
import { UtilService } from '../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';

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
});
