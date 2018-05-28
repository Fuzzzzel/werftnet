import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { CustomerEditService } from './customer-edit.service';
import { UtilService } from '../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerSearchService } from '../customer-search/customer-search.service';
import { Customer, CustomerContact } from '../customer.model';
const customerMock = require('./../customer.mock.json');

describe('CustomerEditService', () => {
  let location: Location
  let router: Router
  let service: CustomerEditService
  let backend: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'customer/edit',
            redirectTo: ''
          },
          {
            path: 'customer/edit_contact',
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
    service = TestBed.get(CustomerEditService)
    backend = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save customer', () => {
    service.saveCustomer(new Customer())
    const req = backend.expectOne('/customers');
    expect(req.request.method).toBe("POST");
    req.flush({}, { status: 200, statusText: 'Ok' });
  });


  it('should get customer and run edit', () => {
    service.editCustomer(1)
    const req = backend.expectOne('/customers/1');
    expect(req.request.method).toBe("GET");
    req.flush(customerMock, { status: 200, statusText: 'Ok' });

    // expect(location.path()).toBe('customer/edit');
  })


  it('should delete customer', () => {
    const customerToDelete = new Customer()
    customerToDelete.id = 1
    spyOn(window, 'confirm').and.returnValue(true);
    service.deleteCustomer(customerToDelete)
    const req = backend.expectOne('/customers/' + customerToDelete.id);
    expect(req.request.method).toBe("DELETE");
    req.flush({}, { status: 200, statusText: 'Ok' });
  });

  it('should get customer contact and run edit', () => {
    service.editCustomerContact(1, 1)
    const req = backend.expectOne('/customers/1/contacts/1');
    expect(req.request.method).toBe("GET");
    req.flush(new CustomerContact(), { status: 200, statusText: 'Ok' });

    // expect(location.path()).toBe('customer/edit');
  })


  it('should not edit customer contact if customer id is missing', () => {
    service.editCustomerContact(null, 1)
    spyOn(window, 'confirm').and.returnValue(true)
  })


  it('should save customer contact', () => {
    let customerContactToSave = { id: null, customer_id: null }

    customerContactToSave.id = 1
    customerContactToSave.customer_id = 1

    service.saveCustomerContact(customerContactToSave)
    const req = backend.expectOne('/customers/1/contacts/1');
    expect(req.request.method).toBe("POST");
    req.flush({}, { status: 200, statusText: 'Ok' });
  });

  it('should delete customer contact', (done) => {
    let customerContactToDelete = { id: null, customer_id: null, name1: '', name2: '' }

    customerContactToDelete.id = 1
    customerContactToDelete.customer_id = 1

    let spy = spyOn(window, 'confirm').and.returnValues(false, true)
    service.deleteCustomerContact(customerContactToDelete)
      .catch(() => {
        service.deleteCustomerContact(customerContactToDelete)
          .then(() => { done() })
          .catch(() => { throw new Error('Das sollte nicht passieren') })

        const req = backend.expectOne('/customers/1/contacts/1');
        expect(req.request.method).toBe("DELETE");
        req.flush({}, { status: 200, statusText: 'Ok' });
      })
  });
})
