import { TestBed, inject } from '@angular/core/testing';

import { AdminSystemEditImprintService } from './admin-system-edit-imprint.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from '../../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminSystemEditImprintService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AdminSystemEditImprintService,
        UtilService
      ]
    });
  });

  it('should be created', inject([AdminSystemEditImprintService], (service: AdminSystemEditImprintService) => {
    expect(service).toBeTruthy();
  }));
});
