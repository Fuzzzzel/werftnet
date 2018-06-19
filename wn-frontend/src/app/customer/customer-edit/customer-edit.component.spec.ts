import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'

import { CustomerEditComponent } from './customer-edit.component'
import { SharedModule } from '../../shared/shared.module'
import { UtilService } from '../../core/util.service'
import { RouterTestingModule } from '@angular/router/testing'
import { CoreDataService } from '../../core/core-data.service'
import { CoreDataServiceMock } from '../../core/core-data.service-mock'
import { CustomerEditService } from './customer-edit.service'
import { CustomerSearchService } from '../customer-search/customer-search.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Customer } from '../customer.model'
const customerMock = require('./../customer.mock.json')

describe('CustomerEditComponent', () => {
  let component: CustomerEditComponent
  let fixture: ComponentFixture<CustomerEditComponent>
  let backend: HttpTestingController
  let customerEditService: CustomerEditService

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        CustomerEditComponent
      ],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock },
        CustomerEditService,
        CustomerSearchService
      ],
    })
      .compileComponents()

    backend = TestBed.get(HttpTestingController)
    customerEditService = TestBed.get(CustomerEditService)
    fixture = TestBed.createComponent(CustomerEditComponent)
    component = fixture.componentInstance
    tick()
    fixture.detectChanges()
    component.cust_edit = customerMock
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should save customer', fakeAsync(() => {
    component.saveCustomer()
    tick()

    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("POST")
    req.flush(component.cust_edit, { status: 200, statusText: 'OK' })
  }))


  it('should fail to save customer', fakeAsync(() => {
    component.saveCustomer()
    tick()

    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))

  it('should delete customer', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteCustomer()
    tick()

    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(component.cust_edit, { status: 200, statusText: 'OK' })
  }))


  it('should fail to delete customer', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteCustomer()
    tick()

    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))

  it('should cancel edit', () => {
    component.cancelEdit()
  })
})