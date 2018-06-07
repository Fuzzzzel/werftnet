import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'

import { CustomerCompactComponent } from './customer-compact.component'
import { UtilService } from '../../core/util.service'
import { SharedModule } from '../../shared/shared.module'
import { RouterTestingModule } from '@angular/router/testing'
import { CoreDataService } from '../../core/core-data.service'
import { CustomerSearchService } from '../customer-search/customer-search.service'
import { CustomerEditService } from '../customer-edit/customer-edit.service'
import { ViewChild, Component } from '@angular/core'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Customer, CustomerContact } from '../customer.model'
let customerMock = require('./../customer.mock.json')

describe('CustomerCompactComponent', () => {
  let component: CustomerCompactComponent
  let fixture: ComponentFixture<CustomerCompactComponent>
  let backend: HttpTestingController

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([
          {
            path: 'customer/edit',
            redirectTo: ''
          },
          {
            path: 'customer/edit_contact',
            redirectTo: ''
          }
        ]), RouterTestingModule.withRoutes([
          {
            path: 'customer/edit',
            redirectTo: ''
          },
          {
            path: 'customer/edit_contact',
            redirectTo: ''
          }
        ]),
        HttpClientTestingModule
      ],
      declarations: [
        CustomerCompactComponent
      ],
      providers: [
        UtilService,
        CustomerEditService,
        CustomerSearchService
      ]
    })
      .compileComponents()
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(CustomerCompactComponent)
    component = fixture.componentInstance
    component.customer = customerMock
    tick()
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(fixture.nativeElement.querySelector('.compact-default')).toBeTruthy()
  })

  it('should edit customer', fakeAsync(() => {
    let customer = new Customer()
    customer.id = 1
    component.editCustomer(customer)
    tick()

    const req = backend.expectOne('/customers/' + customer.id)
    expect(req.request.method).toBe("GET")
    req.flush(customer, { status: 200, statusText: 'Ok' })

  }))

  it('should fail to edit customer', fakeAsync(() => {
    let customer = new Customer()
    customer.id = 1
    component.editCustomer(customer)
    tick()

    const req = backend.expectOne('/customers/' + customer.id)
    expect(req.request.method).toBe("GET")
    req.flush(customer, { status: 404, statusText: 'Not Found' })
  }))

  it('should edit customer contact', fakeAsync(() => {
    let customer = new Customer()
    customer.id = 1
    let contact = new CustomerContact()
    contact.id = 2

    component.editcontact(customer, contact)
    tick()

    const req = backend.expectOne('/customers/' + customer.id + '/contacts/' + contact.id)
    expect(req.request.method).toBe("GET")
    req.flush(customer, { status: 200, statusText: 'Ok' })
  }))

  it('should failt to edit customer contact', fakeAsync(() => {
    component.editcontact(null, null)
    tick()
  }))
})
