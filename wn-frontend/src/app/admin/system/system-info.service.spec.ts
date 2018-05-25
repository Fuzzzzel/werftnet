import { TestBed, inject } from '@angular/core/testing';

import { SystemInfoService } from './system-info.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../../core/util.service';

describe('SystemInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        SystemInfoService,
        UtilService
      ]
    });
  });

  it('should be created', inject([SystemInfoService], (service: SystemInfoService) => {
    expect(service).toBeTruthy();
  }));
});
