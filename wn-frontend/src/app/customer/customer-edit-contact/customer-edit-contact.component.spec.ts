import { async, ComponentFixture, TestBed } from '@angular/core/testing'

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

describe('CustomerEditContactComponent', () => {
  let component: CustomerEditContactComponent
  let fixture: ComponentFixture<CustomerEditContactComponent>
  let backend: HttpTestingController
  let customerEditService: CustomerEditService

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
        CustomerSearchService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
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
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should cancel edit', () => {
    component.cancelEdit()
  })

  it('should save cutomer contact', (done) => {
    component.contact_edit = new CustomerContact()
    component.contact_edit.id = 2

    customerEditService.prepareEditCustomerContact(1, 2)
      .then(() => {
        component.saveCustomerContact()
          .then((contact) => {
            done()
          })

        const req2 = backend.expectOne('/customers/1/contacts/2')
        expect(req2.request.method).toBe("POST")
        req2.flush(component.contact_edit, { status: 200, statusText: 'Ok' })
      })

    const req = backend.expectOne('/customers/1/contacts/2')
    expect(req.request.method).toBe("GET")
    req.flush(component.contact_edit, { status: 200, statusText: 'Ok' })

  })

  it('should fail to save cutomer contact', (done) => {
    component.contact_edit = new CustomerContact()
    component.contact_edit.id = 2

    spyOn(window, 'alert').and.returnValue(true)
    customerEditService.prepareEditCustomerContact(1, 2)
      .then(() => {
        component.saveCustomerContact()
          .catch(() => {
            done()
          })

        const req2 = backend.expectOne('/customers/1/contacts/2')
        expect(req2.request.method).toBe("POST")
        req2.flush(null, { status: 404, statusText: 'Not Found' })
      })

    const req = backend.expectOne('/customers/1/contacts/2')
    expect(req.request.method).toBe("GET")
    req.flush(component.contact_edit, { status: 200, statusText: 'Ok' })

  })

  it('should delete cutomer contact', (done) => {
    component.contact_edit = new CustomerContact()
    component.contact_edit.id = 2
    component.contact_edit['customer_id'] = 1

    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteCustomerContact()
      .then((contact) => {
        done()
      })

    const req2 = backend.expectOne('/customers/1/contacts/2')
    expect(req2.request.method).toBe("DELETE")
    req2.flush(component.contact_edit, { status: 200, statusText: 'Ok' })
  })

  it('should fail to delete cutomer contact', (done) => {
    component.contact_edit = new CustomerContact()
    component.contact_edit.id = 2
    component.contact_edit['customer_id'] = 1

    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteCustomerContact()
      .catch(() => {
        done()
      })

    const req2 = backend.expectOne('/customers/1/contacts/2')
    expect(req2.request.method).toBe("DELETE")
    req2.flush(null, { status: 404, statusText: 'Not Found' })
  })
})
