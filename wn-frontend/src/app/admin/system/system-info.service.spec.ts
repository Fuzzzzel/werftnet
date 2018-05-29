import { TestBed, inject } from '@angular/core/testing';

import { SystemInfoService } from './system-info.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../../core/util.service';

describe('SystemInfoService', () => {
  let service: SystemInfoService
  let backend: HttpTestingController
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
    service = TestBed.get(SystemInfoService)
    backend = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch imprint', () => {
    const req = backend.expectOne('/admin/settings/imprint');
    expect(req.request.method).toBe("GET");
    req.flush('Imprint text', { status: 200, statusText: 'OK' });
  });

  it('should fail to fetch imprint', () => {
    const req = backend.expectOne('/admin/settings/imprint');
    expect(req.request.method).toBe("GET");
    req.flush(null, { status: 404, statusText: 'Not Found' });
  });


});
