import { TestBed, inject } from '@angular/core/testing';

import { OrderEditService } from './order-edit.service';
import { UtilService } from '../../../core/util.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Order } from '../order.model';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataService } from '../../../core/core-data.service';
import { CoreDataServiceMock } from '../../../core/core-data.service-mock';
import { Customer } from '../../../customer/customer.model';

describe('OrderEditService', () => {
  let service: OrderEditService
  let backend: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        OrderEditService,
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    });

    service = TestBed.get(OrderEditService)
    backend = TestBed.get(HttpTestingController)
  });

  it('should be created', inject([OrderEditService], (service: OrderEditService) => {
    expect(service).toBeTruthy();
  }));

  it('should get order to edit', () => {
    const order = service.getOrderToEdit()
    expect(order).toBeTruthy()
  })

  it('should set customer', () => {
    let customer = new Customer()
    customer.id = 1
    service.setCustomer(customer)
    expect(service.orderToEdit.customer.id).toEqual(1)
  })

  it('should prepare edit order', (done) => {
    let order: Order = new Order()
    order.id = 1

    service.prepareEditOrder(order.id)
      .then((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + order.id)
    expect(req.request.method).toBe("GET")
    req.flush([], { status: 200, statusText: 'Ok' })
  })

  it('should fail to prepare edit order (http)', (done) => {
    let order: Order = new Order()
    order.id = 1

    service.prepareEditOrder(order.id)
      .catch((error) => {
        expect(error).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/orders/' + order.id)
    expect(req.request.method).toBe("GET")
    req.flush([], { status: 404, statusText: 'Not Found' })
  })

  it('should prepare edit order for new order', (done) => {
    service.prepareEditOrder(null)
      .then(() => {
        done()
      })
  })

  it('should fail to set new order status', () => {
    expect(() => { service.setOrderStatusTo('NOT_EXISTING_STATUS') }).toThrow(new Error('Der Status "undefined" existiert nicht!'))
  })

  it('should save order', (done) => {
    let order = new Order()
    service.saveOrder(order)
      .then((data) => {
        done()
      })

    const req = backend.expectOne('/orders')
    expect(req.request.method).toBe("POST")
    req.flush(order, { status: 200, statusText: 'OK' })
  })

  it('should fail to save order', (done) => {
    let order = new Order()
    order.id = 1
    service.saveOrder(order)
      .catch((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + order.id)
    expect(req.request.method).toBe("POST")
    req.flush(order, { status: 404, statusText: 'Not Found' })
  })

  it('should delete order', (done) => {
    let order = new Order()
    order.id = 1
    service.deleteOrder(order)
      .then((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + order.id)
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 200, statusText: 'OK' })
  })

  it('should fail to delete order (http)', (done) => {
    let order = new Order()
    order.id = 1
    service.deleteOrder(order)
      .catch((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + order.id)
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  })

  it('should fail to delete order (missing id)', (done) => {
    let order = new Order()
    service.deleteOrder(order)
      .catch((data) => {
        done()
      })
  })
});
