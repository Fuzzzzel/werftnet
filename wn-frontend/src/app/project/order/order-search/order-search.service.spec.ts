import { TestBed, inject } from '@angular/core/testing';

import { OrderSearchService } from './order-search.service';
import { UtilService } from '../../../core/util.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Order } from '../order.model';

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
});
