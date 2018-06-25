import { TestBed, inject } from '@angular/core/testing';

import { OrderSearchService } from './order-search.service';
import { UtilService } from '../../../core/util.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Order } from '../order.model';
import { OrderSearchParams } from './order-search-params.model';

describe('OrderSearchService', () => {
  let service: OrderSearchService
  let backend: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        OrderSearchService,
        UtilService
      ]
    })

    service = TestBed.get(OrderSearchService)
    backend = TestBed.get(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  });

  it('should get orders loaded', () => {
    const ordersLoaded = service.getOrdersLoaded()
    expect(ordersLoaded).toBeTruthy()
  })

  it('should get last search Params', () => {
    const lastSearchParams = service.getLastSearchParams()
    expect(lastSearchParams).toBeTruthy()
  })

  it('should search orders with search params', (done) => {
    let searchParams = {}
    service.searchOrders(searchParams)
      .then((data) => {
        done()
      })

    const req = backend.expectOne('/orders/search')
    expect(req.request.method).toBe("POST")
    req.flush([], { status: 200, statusText: 'OK' })
  })

  it('should search orders without search params', (done) => {
    service.searchOrders(null)
      .then((data) => {
        done()
      })

    const req = backend.expectOne('/orders/search')
    expect(req.request.method).toBe("POST")
    req.flush([], { status: 200, statusText: 'OK' })
  })

  it('should fail to search orders', (done) => {
    service.searchOrders(new OrderSearchParams())
      .catch((data) => {
        done()
      })

    const req = backend.expectOne('/orders/search')
    expect(req.request.method).toBe("POST")
    req.flush([], { status: 404, statusText: 'Not Found' })
  })
});
