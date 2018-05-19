import { TestBed, inject } from '@angular/core/testing';

import { CustomerEditService } from './customer-edit.service';
import { UtilService } from '../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerSearchService } from '../customer-search/customer-search.service';
import { Customer } from '../customer.model';
const customerMock = require('./../customer.mock.json');

describe('CustomerEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CustomerEditService,
        CustomerSearchService,
        UtilService
      ]
    });
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

  it('should delete customer', inject([CustomerEditService, HttpTestingController], (service: CustomerEditService, backend: HttpTestingController) => {
    const customerToDelete = new Customer()
    customerToDelete.id = 1
    spyOn(window, 'confirm').and.returnValue(true);
    service.deleteCustomer(customerToDelete)
    const req = backend.expectOne('/customers/' + customerToDelete.id);
    expect(req.request.method).toBe("DELETE");
    req.flush({}, { status: 200, statusText: 'Ok' });
  }));

});
