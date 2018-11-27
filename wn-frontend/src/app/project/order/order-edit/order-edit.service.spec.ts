import { TestBed, inject } from '@angular/core/testing';

import { OrderEditService } from './order-edit.service';
import { UtilService } from '../../../core/util.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Order } from '../order.model';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataService } from '../../../core/core-data.service';
import { CoreDataServiceMock } from '../../../core/core-data.service-mock';
import { Customer } from '../../../customer/customer.model';
import { OrderPosition } from '../order-position.model';
import { CustomerService } from '../../../customer/customer.service';

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
        CustomerService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    });

    service = TestBed.get(OrderEditService)
    backend = TestBed.get(HttpTestingController)
  });

  it('should be created', inject([OrderEditService], (service: OrderEditService) => {
    expect(service).toBeTruthy();
  }));

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

  it('should fail to prepare edit order for new customer', (done) => {
    service.prepareEditOrder(null, 1)
      .catch((err) => {
        expect(err).toBeDefined()
        done()
      })

    const req = backend.expectOne('/customers/1')
    expect(req.request.method).toBe("GET")
    req.flush([], { status: 404, statusText: 'Not Found' })
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

  // Order Position Tests - Begin
  it('should create new Position', (done) => {
    let order = new Order()
    order.id = 1
    service.createNewPosition(order)
      .then((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + order.id + '/positions')
    expect(req.request.method).toBe("POST")
    req.flush({}, { status: 200, statusText: 'Not Found' })
  })

  it('should fail to create new Position', (done) => {
    let order = new Order()
    order.id = 1
    service.createNewPosition(order)
      .catch((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + order.id + '/positions')
    expect(req.request.method).toBe("POST")
    req.flush({}, { status: 400, statusText: 'Not Found' })
  })

  it('should save Position', (done) => {
    let position = new OrderPosition()
    position.id = 2
    position.order_id = 1
    service.savePosition(position)
      .then((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + position.order_id + '/positions/' + position.id)
    expect(req.request.method).toBe("POST")
    req.flush({}, { status: 200, statusText: 'Not Found' })
  })

  it('should fail to save Position', (done) => {
    let position = new OrderPosition()
    position.id = 2
    position.order_id = 1
    service.savePosition(position)
      .catch((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + position.order_id + '/positions/' + position.id)
    expect(req.request.method).toBe("POST")
    req.flush({}, { status: 400, statusText: 'Not Found' })
  })

  it('should delete Position', (done) => {
    let position = new OrderPosition()
    position.id = 2
    position.order_id = 1
    service.deletePosition(position)
      .then((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + position.order_id + '/positions/' + position.id)
    expect(req.request.method).toBe("DELETE")
    req.flush({}, { status: 200, statusText: 'Not Found' })
  })

  it('should fail to delete Position', (done) => {
    let position = new OrderPosition()
    position.id = 2
    position.order_id = 1
    service.deletePosition(position)
      .catch((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + position.order_id + '/positions/' + position.id)
    expect(req.request.method).toBe("DELETE")
    req.flush({}, { status: 400, statusText: 'Not Found' })
  })

  it('should refresh positions', () => {
    service.orderToEdit = new Order()
    service.orderToEdit.id = 1
    service.refreshPositions()

    const req = backend.expectOne('/orders/' + service.orderToEdit.id + '/positions')
    expect(req.request.method).toBe("GET")
    req.flush([], { status: 200, statusText: 'Not Found' })
  })

  it('should fail to refresh positions', () => {
    service.orderToEdit = new Order()
    service.orderToEdit.id = 1
    service.refreshPositions()

    const req = backend.expectOne('/orders/' + service.orderToEdit.id + '/positions')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 400, statusText: 'Not Found' })
  })
  // Order Position Tests - End

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
