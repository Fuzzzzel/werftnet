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
import { OrderEditService } from '../../project/order/order-edit/order-edit.service';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
let customerMock = require('./../customer.mock.json')

describe('CustomerCompactComponent', () => {
  let component: CustomerCompactComponent
  let fixture: ComponentFixture<CustomerCompactComponent>
  let backend: HttpTestingController
  let orderEditService: OrderEditService

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([
          {
            path: 'customer/new',
            redirectTo: ''
          },
          {
            path: 'customer/edit/:customerId',
            redirectTo: ''
          },
          {
            path: 'customer/new_contact/:customerId',
            redirectTo: ''
          },
          {
            path: 'customer/edit_contact/:customerId/:contactId',
            redirectTo: ''
          },
          {
            path: 'order/new/:customerId',
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
        CustomerSearchService,
        OrderEditService,
        CustomerService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }

      ]
    })
      .compileComponents()
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(CustomerCompactComponent)
    component = fixture.componentInstance
    component.customer = customerMock
    orderEditService = TestBed.get(OrderEditService)
    tick()
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(fixture.nativeElement.querySelector('.compact-default')).toBeTruthy()
  })

  it('should create new customer ', fakeAsync(() => {
    component.editCustomer()
    tick()
  }))

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

  it('should create new customer contact', fakeAsync(() => {
    let customer = new Customer()
    customer.id = 1

    component.editcontact(customer)
    tick()
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

  it('should fail to edit customer contact', fakeAsync(() => {
    component.editcontact(null, null)
    tick()
  }))

  it('should create new order for this customer', fakeAsync(() => {
    let customer = new Customer()
    customer.id = 1
    component.createNewOrder(customer)
  }))

  it('should fail to create new order for this customer', fakeAsync(() => {
    spyOn(orderEditService, 'prepareEditOrder').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    });

    let customer = new Customer()
    customer.id = 1
    component.createNewOrder(customer)
  }))
})
