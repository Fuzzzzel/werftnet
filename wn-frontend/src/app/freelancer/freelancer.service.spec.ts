import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { FreelancerService } from './freelancer.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('FreelancerService', () => {
  let service: FreelancerService
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FreelancerService
      ]
    });

    service = TestBed.get(FreelancerService)
    backend = TestBed.get(HttpTestingController)

    const req = backend.expectOne('/freelancers/dropdownvalues')
    expect(req.request.method).toBe("GET")
    req.flush([], { status: 200, statusText: 'Ok' })
  }))

  it('should be created', fakeAsync(() => {
    expect(service).toBeTruthy();
    tick()
    service.getFreelancerDropdownValues()
  }))

  it('should fetch freelancer dropdown values', fakeAsync(() => {
    service.refreshFreelancerDropdownValues()
    tick()

    const req = backend.expectOne('/freelancers/dropdownvalues')
    expect(req.request.method).toBe("GET")
    req.flush([], { status: 200, statusText: 'Ok' })
  }))

  it('should fail to fetch freelancer dropdown values', fakeAsync(() => {
    service.refreshFreelancerDropdownValues()
    spyOn(window, 'alert').and.returnValue(true)
    tick()

    const req = backend.expectOne('/freelancers/dropdownvalues')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))
});
