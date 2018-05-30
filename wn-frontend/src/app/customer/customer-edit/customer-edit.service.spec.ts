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

  it('should fail to get customer contact by id', (done) => {
    service.getCustomerContactById(null, null)
      .catch((error) => {
        service.getCustomerContactById(1, 2)
          .catch((error) => {
            done()
          })
        const req = backend.expectOne('/customers/1/contacts/2');
        expect(req.request.method).toBe("GET");
        req.flush({}, { status: 404, statusText: 'Not Found' });
      })
  })

  it('should save customer', (done) => {
    let customer = new Customer()
    customer.id = 1

    service.saveCustomer(customer)
      .then(() => {
        done()
      })
    const req = backend.expectOne('/customers/' + customer.id);
    expect(req.request.method).toBe("POST");
    req.flush({}, { status: 200, statusText: 'Ok' });
  });

  it('should fail to save customer', (done) => {
    spyOn(window, 'alert').and.returnValue(true);
    service.saveCustomer(new Customer())
      .catch((error) => {
        done()
      })
    const req = backend.expectOne('/customers');
    expect(req.request.method).toBe("POST");
    req.flush({}, { status: 404, statusText: 'Not Found' });
  });

  it('should delete customer', (done) => {
    const customerToDelete = new Customer()
    customerToDelete.id = 1
    spyOn(window, 'confirm').and.returnValue(true);
    service.deleteCustomer(customerToDelete)
      .then(() => {
        done()
      })
    const req = backend.expectOne('/customers/' + customerToDelete.id);
    expect(req.request.method).toBe("DELETE");
    req.flush({}, { status: 200, statusText: 'Ok' });
  });

  it('should fail to delete customer if id is missing', (done) => {
    const customerToDelete = new Customer()
    service.deleteCustomer(customerToDelete)
      .catch(() => {
        done()
      })
  });

  it('should fail to delete customer', (done) => {
    const customerToDelete = new Customer()
    customerToDelete.id = 1

    spyOn(window, 'confirm').and.returnValue(true);
    service.deleteCustomer(customerToDelete)
      .catch((error) => {
        done()
      })
    const req = backend.expectOne('/customers/' + customerToDelete.id);
    expect(req.request.method).toBe("DELETE");
    req.flush({}, { status: 404, statusText: 'Not Found' });
  });

  it('should cancel delete customer', (done) => {
    const customerToDelete = new Customer()
    customerToDelete.id = 1
    spyOn(window, 'confirm').and.returnValue(false);
    service.deleteCustomer(customerToDelete)
      .catch(() => {
        done()
      })
  });

  it('should prepare edit new customer', (done) => {
    service.prepareEditCustomer(null)
      .then(() => {
        done()
      })
  })

  it('should prepare edit customer', (done) => {
    service.prepareEditCustomer(1)
      .then(() => {
        done()
      })
    const req = backend.expectOne('/customers/1');
    expect(req.request.method).toBe("GET");
    req.flush(customerMock, { status: 200, statusText: 'Ok' });
  })

  it('should fail to prepare edit customer', (done) => {
    service.prepareEditCustomer(1)
      .catch((error) => {
        done()
      })
    const req = backend.expectOne('/customers/1');
    expect(req.request.method).toBe("GET");
    req.flush(customerMock, { status: 404, statusText: 'Not Found' });
  })

  it('should get customer contact and run edit', (done) => {
    service.prepareEditCustomerContact(1, 1)
      .then(() => {
        done()
      })

    const req = backend.expectOne('/customers/1/contacts/1');
    expect(req.request.method).toBe("GET");
    req.flush(new CustomerContact(), { status: 200, statusText: 'Ok' });
  })

  // Customer Contact

  it('should prepare edit new customer', (done) => {
    service.prepareEditCustomerContact(1, null)
      .then(() => {
        done()
      })
  })

  it('should fail to prepare edit customer', (done) => {
    service.prepareEditCustomerContact(1, 2)
      .catch((error) => {
        done()
      })
    const req = backend.expectOne('/customers/1/contacts/2');
    expect(req.request.method).toBe("GET");
    req.flush(customerMock, { status: 404, statusText: 'Not Found' });
  })

  it('should not edit customer contact if customer id is missing', (done) => {
    service.prepareEditCustomerContact(null, 1)
      .catch((error) => {
        done()
      })
  })

  it('should save customer contact', (done) => {
    let customerContactToSave = { id: null, customer_id: null }

    customerContactToSave.id = 1
    customerContactToSave.customer_id = 1

    service.saveCustomerContact(customerContactToSave)
      .then((customerContact) => {
        done()
      })
    const req = backend.expectOne('/customers/1/contacts/1');
    expect(req.request.method).toBe("POST");
    req.flush({}, { status: 200, statusText: 'Ok' });
  });

  it('should fail to save customer contact', (done) => {
    let customerContactToSave = { id: null, customer_id: null }

    customerContactToSave.id = 1
    customerContactToSave.customer_id = 1

    service.saveCustomerContact(customerContactToSave)
      .catch((error) => {
        done()
      })
    const req = backend.expectOne('/customers/1/contacts/1');
    expect(req.request.method).toBe("POST");
    req.flush({}, { status: 404, statusText: 'Not Found' });
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

  it('should fail to delete customer contact if id is missing', (done) => {
    let customerContactToDelete = { customer_id: 1, name1: '', name2: '' }

    let spy = spyOn(window, 'confirm').and.returnValues(true)
    service.deleteCustomerContact(customerContactToDelete)
      .catch(() => {
        done()
      })
  });

  it('should fail to delete customer contact', (done) => {
    let customerContactToDelete = { id: 1, customer_id: 1, name1: '', name2: '' }

    let spy = spyOn(window, 'confirm').and.returnValues(true)
    service.deleteCustomerContact(customerContactToDelete)
      .catch(() => {
        done()
      })
    const req = backend.expectOne('/customers/1/contacts/1');
    expect(req.request.method).toBe("DELETE");
    req.flush({}, { status: 404, statusText: 'Not Found' });
  });
})
