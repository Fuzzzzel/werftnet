import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'

import { CustomerEditContactComponent } from './customer-edit-contact.component'
import { SharedModule } from '../../shared/shared.module'
import { UtilService } from '../../core/util.service'
import { RouterTestingModule } from '@angular/router/testing'
import { CoreDataService } from '../../core/core-data.service'
import { CoreDataServiceMock } from '../../core/core-data.service-mock'
import { CustomerEditService } from '../customer-edit/customer-edit.service'
import { CustomerSearchService } from '../customer-search/customer-search.service'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { CustomerContact } from '../customer.model'
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from './../../test/activated-route-stub';

describe('CustomerEditContactComponent', () => {
  let component: CustomerEditContactComponent
  let fixture: ComponentFixture<CustomerEditContactComponent>
  let backend: HttpTestingController
  let customerEditService: CustomerEditService
  let activatedRoute: ActivatedRouteStub

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        UtilService,
        CustomerEditService,
        CustomerService,
        CustomerSearchService,
        { provide: CoreDataService, useClass: CoreDataServiceMock },
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub
        }
      ],
      declarations: [CustomerEditContactComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    customerEditService = TestBed.get(CustomerEditService)
    fixture = TestBed.createComponent(CustomerEditContactComponent)
    component = fixture.componentInstance
    spyOn(component.ngxUiLoaderService, 'start').and.returnValue(true)
    spyOn(component.ngxUiLoaderService, 'stop').and.returnValue(true)
  })

  function initWithCustomer() {
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any
    activatedRoute.testParamMap = { customerId: 1 }
    fixture.detectChanges()
    tick()
  }

  it('should create', fakeAsync(() => {
    initWithCustomer()
    expect(component).toBeTruthy()
  }))

  it('should cancel edit', () => {
    component.cancelEdit()
  })

  it('should fail to init component', fakeAsync(() => {
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any
    activatedRoute.testParamMap = { customerId: null }
    fixture.detectChanges()
    spyOn(window, 'alert').and.returnValue(true)
    tick()
  }))

  function prepareEditDummyContact() {
    return new Promise<CustomerContact>((resolve, reject) => {
      customerEditService.prepareEditCustomerContact(1, 2)
        .then((data) => {
          resolve(data)
        })
        .catch(() => {
          throw new Error('Das sollte nicht passieren!')
        })

      tick()
      const req = backend.expectOne('/customers/1/contacts/2')
      expect(req.request.method).toBe("GET")
      req.flush(new CustomerContact(), { status: 200, statusText: 'Ok' })
    })
  }

  it('should save cutomer contact', fakeAsync(() => {
    initWithCustomer()
    component.contact_edit = new CustomerContact()
    component.contact_edit.id = 2
    component.customerId = 1

    prepareEditDummyContact()
      .then(() => {
        component.saveCustomerContact()
        tick()

        const req2 = backend.expectOne('/customers/1/contacts/2')
        expect(req2.request.method).toBe("POST")
        req2.flush(component.contact_edit, { status: 200, statusText: 'Ok' })
      })

    tick()
  }))

  it('should fail to save cutomer contact', fakeAsync(() => {
    initWithCustomer()
    component.contact_edit = new CustomerContact()
    component.contact_edit.id = 2
    component.customerId = 1

    spyOn(window, 'alert').and.returnValue(true)
    prepareEditDummyContact()
      .then(() => {
        component.saveCustomerContact()
        tick()

        const req2 = backend.expectOne('/customers/1/contacts/2')
        expect(req2.request.method).toBe("POST")
        req2.flush(null, { status: 404, statusText: 'Not Found' })
      })

    tick()
  }))

  it('should delete cutomer contact', fakeAsync(() => {
    initWithCustomer()
    component.contact_edit = new CustomerContact()
    component.contact_edit.id = 2
    component.customerId = 1

    prepareEditDummyContact()
      .then(() => {
        spyOn(window, 'confirm').and.returnValue(true)
        component.deleteCustomerContact()
        tick()

        const req2 = backend.expectOne('/customers/1/contacts/2')
        expect(req2.request.method).toBe("DELETE")
        req2.flush(null, { status: 200, statusText: 'Ok' })
        tick()
      })
    tick()
  }))

  it('should fail to delete cutomer contact', fakeAsync(() => {
    initWithCustomer()
    component.contact_edit = new CustomerContact()
    component.contact_edit.id = 2
    component.customerId = 1

    prepareEditDummyContact()
      .then(() => {
        spyOn(window, 'confirm').and.returnValue(true)
        component.deleteCustomerContact()
        tick()

        spyOn(window, 'alert').and.returnValue(true)
        const req2 = backend.expectOne('/customers/1/contacts/2')
        expect(req2.request.method).toBe("DELETE")
        req2.flush(null, { status: 404, statusText: 'Not Found' })
        tick()
      })

    tick()
  }))

  it('should cancel to delete cutomer contact', fakeAsync(() => {
    initWithCustomer()
    spyOn(window, 'confirm').and.returnValue(false)
    component.deleteCustomerContact()
  }))
})
