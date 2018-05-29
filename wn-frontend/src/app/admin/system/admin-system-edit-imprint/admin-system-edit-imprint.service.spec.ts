import { TestBed, inject } from '@angular/core/testing';

import { AdminSystemEditImprintService } from './admin-system-edit-imprint.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UtilService } from '../../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminSystemEditImprintService', () => {
  let service: AdminSystemEditImprintService
  let backend: HttpTestingController
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
    })
    backend = TestBed.get(HttpTestingController)
    service = TestBed.get(AdminSystemEditImprintService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fail to fetch imprint', () => {
    const req = backend.expectOne('/admin/settings/imprint').flush(null, { status: 404, statusText: '404 Not Found' });
    spyOn(window, 'alert').and.returnValue(true);
  })

  it('should  fetch imprint', () => {
    const req = backend.expectOne('/admin/settings/imprint');
    expect(req.request.method).toBe("GET");
    req.flush('Imprint text', { status: 200, statusText: 'OK' });
  })

  it('should save imprint', (done) => {
    const req = backend.expectOne('/admin/settings/imprint');
    expect(req.request.method).toBe("GET");
    req.flush('Imprint text', { status: 200, statusText: 'OK' });

    service.saveImprint('New Imprint Text')
      .then((data) => {
        expect(data).toBeTruthy()
        done()
      })

    const req2 = backend.expectOne('/admin/settings/imprint');
    expect(req2.request.method).toBe("POST");
    req2.flush('New Imprint Text', { status: 200, statusText: 'OK' });
  })

  it('should fail to save imprint', (done) => {
    const req = backend.expectOne('/admin/settings/imprint');
    expect(req.request.method).toBe("GET");
    req.flush('Imprint Text', { status: 200, statusText: 'OK' });

    service.saveImprint('New Imprint Text')
      .catch((error) => {
        done()
      })

    const req2 = backend.expectOne('/admin/settings/imprint');
    expect(req2.request.method).toBe("POST");
    req2.flush(null, { status: 404, statusText: 'Not Found' });
  })
});
