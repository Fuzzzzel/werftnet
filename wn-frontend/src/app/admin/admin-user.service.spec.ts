import { TestBed, inject } from '@angular/core/testing';

import { AdminUserService } from './admin-user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from '../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminUserService', () => {
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
  });

  it('should be created', inject([AdminUserService], (service: AdminUserService) => {
    expect(service).toBeTruthy();
  }));
});
