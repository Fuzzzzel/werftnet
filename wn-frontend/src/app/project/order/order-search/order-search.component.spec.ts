import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { OrderSearchComponent } from './order-search.component';
import { SharedModule } from '../../../shared/shared.module';
import { OrderSearchService } from './order-search.service';
import { UtilService } from '../../../core/util.service';
import { OrderEditService } from '../order-edit/order-edit.service';
import { CoreDataService } from '../../../core/core-data.service';
import { CoreDataServiceMock } from '../../../core/core-data.service-mock';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderCompactComponent } from '../order-compact/order-compact.component';
import { NgbModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../../customer/customer.service';
import { Order } from '../order.model';

describe('OrderSearchComponent', () => {
  let component: OrderSearchComponent
  let fixture: ComponentFixture<OrderSearchComponent>
  let backend: HttpTestingController
  let orderEditService: OrderEditService
  let orderSearchService: OrderSearchService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'order/edit/:orderId',
            redirectTo: ''
          }
        ]),
        NgbModule.forRoot()
      ],
      declarations: [
        OrderSearchComponent,
        OrderCompactComponent
      ],
      providers: [
        UtilService,
        OrderSearchService,
        OrderEditService,
        CustomerService,
        NgbPaginationConfig,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();

    backend = TestBed.get(HttpTestingController)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    orderEditService = TestBed.get(OrderEditService)
    orderSearchService = TestBed.get(OrderSearchService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search orders', fakeAsync(() => {
    spyOn(orderSearchService, 'searchOrders').and.callFake(function () {
      return new Promise((resolve, reject) => {
        resolve([])
      })
    })
    component.searchOrders(null)
  }))

  it('should fail to search orders', fakeAsync(() => {
    spyOn(orderSearchService, 'searchOrders').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    spyOn(window, 'alert').and.returnValue(true)
    component.searchOrders(null)
  }))

  it('should go to edit order', () => {
    const order = new Order()
    order.id = 1
    spyOn(orderEditService, 'prepareEditOrder').and.callFake(function () {
      return new Promise((resolve, reject) => {
        resolve(order)
      })
    })
    component.editOrder(order)
  })

  it('should fail to go to edit order', () => {
    const order = new Order()
    order.id = 1
    spyOn(orderEditService, 'prepareEditOrder').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    spyOn(window, 'alert').and.returnValue(true)
    component.editOrder(order)
  })

});
