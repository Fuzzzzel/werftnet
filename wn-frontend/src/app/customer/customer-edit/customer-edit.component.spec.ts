import { async, ComponentFixture, TestBed } from '@angular/core/testing'

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock },
        CustomerEditService,
        CustomerSearchService
      ],
      declarations: [CustomerEditComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    customerEditService = TestBed.get(CustomerEditService)
    fixture = TestBed.createComponent(CustomerEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.cust_edit = customerMock
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should save customer', (done) => {
    component.saveCustomer()
      .then(() => {
        done()
      })
    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("POST")
    req.flush(component.cust_edit, { status: 200, statusText: 'OK' })
  })


  it('should fail to save customer', (done) => {
    component.saveCustomer()
      .catch(() => {
        done()
      })
    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  })

  it('should delete customer', (done) => {
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteCustomer()
      .then(() => {
        done()
      })
    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(component.cust_edit, { status: 200, statusText: 'OK' })
  })


  it('should fail to delete customer', (done) => {
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteCustomer()
      .catch(() => {
        done()
      })
    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  })

  it('should cancel edit', () => {
    component.cancelEdit()
  })
})
