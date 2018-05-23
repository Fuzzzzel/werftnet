import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { CustomerEditService } from './customer-edit.service';
import { UtilService } from '../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerSearchService } from '../customer-search/customer-search.service';
import { Customer } from '../customer.model';
const customerMock = require('./../customer.mock.json');

describe('CustomerEditService', () => {
  let location: Location
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'customer/edit',
            redirectTo: ''
          }
        ])
      ],
      providers: [
        CustomerEditService,
        CustomerSearchService,
        UtilService
      ]
    });
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    router.initialNavigation()
  });

  it('should be created', inject([CustomerEditService], (service: CustomerEditService) => {
    expect(service).toBeTruthy();
  }));

  it('should save customer', inject([CustomerEditService, HttpTestingController], (service: CustomerEditService, backend: HttpTestingController) => {
    service.saveCustomer(new Customer())
    const req = backend.expectOne('/customers');
    expect(req.request.method).toBe("POST");
    req.flush({}, { status: 200, statusText: 'Ok' });
  }));


  it('should get customer and run edit',
    inject([CustomerEditService, HttpTestingController], (service: CustomerEditService, backend: HttpTestingController) => {
      service.getCustomerByIdAndEdit(1)
      const req = backend.expectOne('/customers/1');
      expect(req.request.method).toBe("GET");
      req.flush(customerMock, { status: 200, statusText: 'Ok' });

      // expect(location.path()).toBe('customer/edit');
    })
  )

  it('should delete customer', inject([CustomerEditService, HttpTestingController], (service: CustomerEditService, backend: HttpTestingController) => {
    const customerToDelete = new Customer()
    customerToDelete.id = 1
    spyOn(window, 'confirm').and.returnValue(true);
    service.deleteCustomer(customerToDelete)
    const req = backend.expectOne('/customers/' + customerToDelete.id);
    expect(req.request.method).toBe("DELETE");
    req.flush({}, { status: 200, statusText: 'Ok' });
  }));
})
