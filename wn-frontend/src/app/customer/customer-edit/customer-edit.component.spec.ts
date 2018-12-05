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
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from './../../test/activated-route-stub';
import { NgxUiLoaderService, NgxUiLoaderModule } from 'ngx-ui-loader';
const customerMock = require('./../customer.mock.json')

describe('CustomerEditComponent', () => {
  let component: CustomerEditComponent
  let fixture: ComponentFixture<CustomerEditComponent>
  let backend: HttpTestingController
  let activatedRoute: ActivatedRouteStub

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxUiLoaderModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        CustomerEditComponent
      ],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock },
        CustomerEditService,
        CustomerService,
        CustomerSearchService,
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub
        }
      ],
    })
      .compileComponents()

    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(CustomerEditComponent)
    component = fixture.componentInstance
    spyOn(component.ngxUiLoaderService, 'start').and.returnValue(true)
    spyOn(component.ngxUiLoaderService, 'stop').and.returnValue(true)
    tick()
  }))

  function initWithCustomer() {
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any
    activatedRoute.testParamMap = { customerId: 1 }
    fixture.detectChanges()

    const cust_edit = customerMock

    const req = backend.expectOne('/customers/' + cust_edit.id)
    expect(req.request.method).toBe("GET")
    req.flush(cust_edit, { status: 200, statusText: 'OK' })
    tick()
  }

  it('should create', fakeAsync(() => {
    initWithCustomer()
    expect(component).toBeTruthy()
    tick()
  }))

  it('should fail to init component', fakeAsync(() => {
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any
    activatedRoute.testParamMap = { customerId: 1 }
    fixture.detectChanges()

    spyOn(window, 'alert').and.returnValue(true)

    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: 'NOT FOUND' })
  }))

  it('should save customer', fakeAsync(() => {
    initWithCustomer()
    component.saveCustomer()
    tick()

    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("POST")
    req.flush(component.cust_edit, { status: 200, statusText: 'OK' })
  }))


  it('should fail to save customer', fakeAsync(() => {
    initWithCustomer()
    component.saveCustomer()
    tick()

    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))

  it('should delete customer', fakeAsync(() => {
    initWithCustomer()
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteCustomer()
    tick()

    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(component.cust_edit, { status: 200, statusText: 'OK' })
  }))


  it('should fail to delete customer', fakeAsync(() => {
    initWithCustomer()
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteCustomer()
    tick()

    spyOn(window, 'alert').and.returnValue(true)
    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))

  it('should cancel edit', () => {
    component.cancelEdit()
  })
})