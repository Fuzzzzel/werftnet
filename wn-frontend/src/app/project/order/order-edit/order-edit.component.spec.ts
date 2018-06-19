import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEditComponent } from './order-edit.component';
import { SharedModule } from '../../../shared/shared.module';
import { UtilService } from '../../../core/util.service';
import { OrderCompactComponent } from '../order-compact/order-compact.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataService } from '../../../core/core-data.service';
import { CoreDataServiceMock } from '../../../core/core-data.service-mock';
import { CustomerService } from '../../../customer/customer.service';
import { Customer } from '../../../customer/customer.model';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrderEditComponent', () => {
  let component: OrderEditComponent
  let fixture: ComponentFixture<OrderEditComponent>
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        OrderEditComponent,
        OrderCompactComponent
      ],
      providers: [
        UtilService,
        CustomerService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(OrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should cancel edit', () => {
    component.cancelEdit()
  })

  it('should reload customer contacts', () => {
    let customer = new Customer()
    customer.id = 1
    component.reloadCustomerContacts(customer)

    const req = backend.expectOne('/customers/' + customer.id + '/contacts')
    expect(req.request.method).toBe("GET")
    req.flush([], { status: 200, statusText: 'Ok' })
  })

  it('should fail to reload customer contacts (id missing)', () => {
    let customer = new Customer()
    spyOn(window, 'alert').and.returnValue(true)
    component.reloadCustomerContacts(customer)
  })

  it('should fail to reload customer contacts (http)', () => {
    let customer = new Customer()
    customer.id = 1
    spyOn(window, 'alert').and.returnValue(true)
    component.reloadCustomerContacts(customer)

    const req = backend.expectOne('/customers/' + customer.id + '/contacts')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  })
});
