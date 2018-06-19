import { TestBed, inject, tick, fakeAsync, async } from '@angular/core/testing'
import { CustomerService } from './customer-service.service'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomerService', () => {
  let service: CustomerService
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CustomerService
      ]
    });

    service = TestBed.get(CustomerService)
    backend = TestBed.get(HttpTestingController)

    const req = backend.expectOne('/customers/dropdownvalues')
    expect(req.request.method).toBe("GET")
    req.flush([], { status: 200, statusText: 'Ok' })
  }))

  it('should be created', fakeAsync(() => {
    expect(service).toBeTruthy();
    tick()
    service.getCustomerDropdownValues()
  }))

  it('should fetch customer dropdown values', fakeAsync(() => {
    service.refreshCustomerDropdownValues()
    tick()

    const req = backend.expectOne('/customers/dropdownvalues')
    expect(req.request.method).toBe("GET")
    req.flush([], { status: 200, statusText: 'Ok' })
  }))

  it('should fail to fetch customer dropdown values', fakeAsync(() => {
    service.refreshCustomerDropdownValues()
    spyOn(window, 'alert').and.returnValue(true)
    tick()

    const req = backend.expectOne('/customers/dropdownvalues')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))
})
