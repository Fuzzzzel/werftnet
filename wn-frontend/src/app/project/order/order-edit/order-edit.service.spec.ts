import { TestBed, inject } from '@angular/core/testing';

import { OrderEditService } from './order-edit.service';
import { UtilService } from '../../../core/util.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Order } from '../order.model';
import { RouterTestingModule } from '@angular/router/testing';

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
        UtilService
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
});
