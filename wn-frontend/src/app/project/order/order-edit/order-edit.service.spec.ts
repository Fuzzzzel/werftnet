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
});
