import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrderHeadEditComponent } from './order-head-edit.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Customer, CustomerContact } from '../../../../customer/customer.model';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataService } from '../../../../core/core-data.service';
import { CoreDataServiceMock } from '../../../../core/core-data.service-mock';
import { UtilService } from '../../../../core/util.service';
import { CustomerService } from '../../../../customer/customer.service';
import { Order } from '../../order.model';
import { detectChanges } from '@angular/core/src/render3';

describe('OrderHeadEditComponent', () => {
  let component: OrderHeadEditComponent;
  let fixture: ComponentFixture<OrderHeadEditComponent>;
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [OrderHeadEditComponent],
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
    fixture = TestBed.createComponent(OrderHeadEditComponent);
    component = fixture.componentInstance;
  });

  function initWithCustomer() {
    let initialCustomer = new Customer()
    initialCustomer.id = 1
    let initialOrder = new Order()

    component.order = initialOrder
    component.order.customer = initialCustomer
    fixture.detectChanges()

    const req = backend.expectOne('/customers/' + component.orderHead.customer.id + '/contacts')
    expect(req.request.method).toBe("GET")
    req.flush([], { status: 200, statusText: 'Ok' })
  }

  function initWithoutCustomer() {
    fixture.detectChanges()
  }

  it('should create and not reload customer contacts', () => {
    initWithoutCustomer()
    expect(component).toBeTruthy();
  });

  it('should create and reload customer contacts', () => {
    initWithCustomer()
    expect(component).toBeTruthy()
  })

  it('should reload customer contacts but not reset selected contact', () => {
    initWithoutCustomer()
    let customer = new Customer()
    customer.id = 1

    let customerContact = new CustomerContact()
    customerContact.id = 1

    component.orderHead.customer_contact = customerContact
    component.reloadCustomerContacts(customer)

    const req = backend.expectOne('/customers/' + customer.id + '/contacts')
    expect(req.request.method).toBe("GET")
    req.flush([customerContact], { status: 200, statusText: 'Ok' })
  })

  it('should fail to reload customer contacts (id missing)', () => {
    initWithCustomer()
    let customer = new Customer()
    spyOn(window, 'alert').and.returnValue(true)
    component.reloadCustomerContacts(customer)
  })

  it('should fail to reload customer contacts (http)', () => {
    initWithCustomer()
    let customer = new Customer()
    customer.id = 1
    spyOn(window, 'alert').and.returnValue(true)
    component.reloadCustomerContacts(customer)

    const req = backend.expectOne('/customers/' + customer.id + '/contacts')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  })

  it('should emit save event', () => {
    spyOn(component.save, 'emit')
    component.saveOrderHead()
    expect(component.save.emit).toHaveBeenCalledWith(component.orderHead)
  })

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit')
    component.cancelEditHead()
    expect(component.cancel.emit).toHaveBeenCalled()
  })
});
