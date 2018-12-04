import { TestBed, fakeAsync } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from './../../core/util.service';

describe('OrderService', () => {
  let service: OrderService
  let backend: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        OrderService,
        UtilService
      ]
    });

    service = TestBed.get(OrderService)
    backend = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });

  it('should fail to fetch last orders', (done) => {
    service.fetchLastOrders()
      .catch((error) => {
        expect(error).toBeDefined()
        done()
      })
    const req = backend.expectOne('/orderstats/createdlast')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: 'NOT FOUND' })
  })
});
