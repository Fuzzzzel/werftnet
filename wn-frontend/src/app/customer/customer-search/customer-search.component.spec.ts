import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'

import { CoreDataService } from '../../core/core-data.service'
import { SharedModule } from '../../shared/shared.module'
import { UtilService } from '../../core/util.service'
import { CustomerSearchComponent } from './customer-search.component'
import { CustomerSearchService } from './customer-search.service'
import { RouterTestingModule } from '@angular/router/testing'
import { CustomerCompactComponent } from '../customer-compact/customer-compact.component'
import { CustomerEditService } from '../customer-edit/customer-edit.service'
import { NgbPagination, NgbModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap'
import { CoreDataServiceMock } from '../../core/core-data.service-mock'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { Customer } from '../customer.model'
import { CustomerService } from '../customer.service';

describe('CustomerSearchComponent', () => {
  let component: CustomerSearchComponent
  let fixture: ComponentFixture<CustomerSearchComponent>
  let backend: HttpTestingController

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'customer/edit',
            redirectTo: ''
          }
        ]),
        NgbModule.forRoot()
      ],
      declarations: [
        CustomerSearchComponent,
        CustomerCompactComponent
      ],
      providers: [
        UtilService,
        CustomerSearchService,
        CustomerEditService,
        CustomerService,
        NgbPaginationConfig,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents()

    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(CustomerSearchComponent)
    component = fixture.componentInstance
    tick()
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should search customers', fakeAsync(() => {
    component.searchCustomers(null)
    tick()
  }))

  it('should edit customer', fakeAsync(() => {
    let customerToEdit = new Customer()
    customerToEdit.id = 1
    component.editCustomer(customerToEdit)
    tick()

    const req = backend.expectOne('/customers/' + customerToEdit.id)
    expect(req.request.method).toBe("GET")
    req.flush(customerToEdit, { status: 200, statusText: 'OK' })
  }))

  it('should fail to edit customer', fakeAsync(() => {
    let customerToEdit = new Customer()
    customerToEdit.id = 1
    component.editCustomer(customerToEdit)
    tick()

    const req = backend.expectOne('/customers/' + customerToEdit.id)
    expect(req.request.method).toBe("GET")
    req.flush(customerToEdit, { status: 404, statusText: 'Not Found' })
  }))
})
