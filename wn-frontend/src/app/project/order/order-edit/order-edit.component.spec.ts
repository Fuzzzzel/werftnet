import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

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
import { OrderEditService } from './order-edit.service';
import { OrderSearchService } from '../order-search/order-search.service';
import { Order } from '../order.model';
import { OrderHeadViewComponent } from './order-head-view/order-head-view.component';
import { OrderHeadEditComponent } from './order-head-edit/order-head-edit.component';
import { OrderPosition } from '../order-position.model';
import { OrderPositionViewComponent } from '../order-position-view/order-position-view.component';
import { OrderPositionEditComponent } from '../order-position-edit/order-position-edit.component';
import { OrderTaskViewComponent } from '../order-task-view/order-task-view.component';
import { OrderTaskEditComponent } from '../order-task-edit/order-task-edit.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { ActivatedRouteStub } from '../../../test/activated-route-stub';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

describe('OrderEditComponent', () => {
  let component: OrderEditComponent
  let fixture: ComponentFixture<OrderEditComponent>
  let backend: HttpTestingController
  let orderEditService: OrderEditService
  let activatedRoute: ActivatedRouteStub

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxUiLoaderModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        OrderEditComponent,
        OrderCompactComponent,
        OrderHeadViewComponent,
        OrderHeadEditComponent,
        OrderPositionViewComponent,
        OrderPositionEditComponent,
        OrderTaskViewComponent,
        OrderTaskEditComponent
      ],
      providers: [
        UtilService,
        CustomerService,
        OrderEditService,
        OrderSearchService,
        { provide: CoreDataService, useClass: CoreDataServiceMock },
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(OrderEditComponent)
    component = fixture.componentInstance
    spyOn(component.ngxUiLoaderService, 'start').and.returnValue(true)
    spyOn(component.ngxUiLoaderService, 'stop').and.returnValue(true)
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any
    orderEditService = TestBed.get(OrderEditService)
  })

  afterEach(() => {
    fixture.destroy()
  })

  function initOrderWithCustomer() {
    activatedRoute.testParamMap = { customerId: 1 }
    activatedRoute.testQueryParamMap = {}
    fixture.detectChanges();

    const newCustomer = new Customer()
    newCustomer.id = 1
    const req = backend.expectOne('/customers/' + 1)
    req.flush(newCustomer, { status: 200, statusText: 'OK' })
  }

  function initOrderWithoutCustomer() {
    activatedRoute.testParamMap = {}
    activatedRoute.testQueryParamMap = {}
    fixture.detectChanges()
  }

  function initOrderWithCustomerFail() {
    activatedRoute.testParamMap = { customerId: 1 }
    activatedRoute.testQueryParamMap = {}
    fixture.detectChanges();

    const newCustomer = new Customer()
    newCustomer.id = 1
    const req = backend.expectOne('/customers/' + 1)
    req.flush({}, { status: 404, statusText: 'NOT_FOUND' })
  }

  it('should create', fakeAsync(() => {
    initOrderWithCustomer()
    tick()
    expect(component).toBeTruthy();
  }))

  it('should fail to load order', fakeAsync(() => {
    spyOn(window, 'alert').and.returnValue(true)
    initOrderWithCustomerFail()
    tick()
  }))

  it('should cancel edit', fakeAsync(() => {
    initOrderWithoutCustomer()
    component.cancelEdit()
  }))

  it('should save order', () => {
    initOrderWithCustomer()
    const order = new Order()
    const orderHead = delete order['positions']
    spyOn(orderEditService, 'saveOrder').and.callFake(function () {
      return new Promise((resolve, reject) => {
        resolve(order)
      })
    })
    component.saveOrderHead(orderHead)
  })

  it('should fail to go to edit order', () => {
    initOrderWithCustomer()
    const order = new Order()
    spyOn(window, 'confirm').and.returnValue(true)
    spyOn(orderEditService, 'saveOrder').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    spyOn(window, 'alert').and.returnValue(true)
    component.saveOrder()
  })

  // Order position - begin
  it('should create new position', () => {
    component.order_edit.id = 1
    let position = new OrderPosition()
    position.id = 2

    component.createNewPosition()

    const req = backend.expectOne('/orders/' + component.order_edit.id + '/positions')
    expect(req.request.method).toBe("POST")
    req.flush(position, { status: 200, statusText: 'OK' })
  })

  it('should fail to create new position', () => {
    let position = new OrderPosition()
    position.id = 2
    spyOn(orderEditService, 'createNewPosition').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    spyOn(window, 'alert').and.returnValue(true)

    component.createNewPosition()
  })

  it('should save position', () => {
    let position = new OrderPosition()
    position.id = 2
    position.order_id = 1

    component.savePosition(position)

    const req = backend.expectOne('/orders/' + position.order_id + '/positions/' + position.id)
    expect(req.request.method).toBe("POST")
    req.flush(position, { status: 200, statusText: 'OK' })
  })

  it('should fail to save position', () => {
    let position = new OrderPosition()
    position.id = 2
    position.order_id = 1
    spyOn(orderEditService, 'savePosition').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    spyOn(window, 'alert').and.returnValue(true)

    component.savePosition(position)
  })

  it('should delete position', () => {
    let position = new OrderPosition()
    position.id = 2
    position.order_id = 1

    spyOn(window, 'confirm').and.returnValue(true)
    component.deletePosition(position)

    const req = backend.expectOne('/orders/' + position.order_id + '/positions/' + position.id)
    expect(req.request.method).toBe("DELETE")
    req.flush(position, { status: 200, statusText: 'OK' })
  })

  it('should cancel delete position', () => {
    let position = new OrderPosition()
    position.id = 2
    position.order_id = 1

    spyOn(window, 'confirm').and.returnValue(false)
    component.deletePosition(position)
  })

  it('should fail to delete position', () => {
    let position = new OrderPosition()
    position.id = 2
    position.order_id = 1

    spyOn(orderEditService, 'deletePosition').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    spyOn(window, 'confirm').and.returnValue(true)
    spyOn(window, 'alert').and.returnValue(true)

    component.deletePosition(position)
  })

  // Order position - end

  it('should delete order', () => {
    initOrderWithCustomer()
    const order = new Order()
    spyOn(window, 'confirm').and.returnValue(true)
    spyOn(orderEditService, 'deleteOrder').and.callFake(function () {
      return new Promise((resolve, reject) => {
        resolve(order)
      })
    })
    spyOn(window, 'alert').and.returnValue(true)
    component.deleteOrder()
  })

  it('should cancel delete order', () => {
    initOrderWithCustomer()
    const order = new Order()
    spyOn(window, 'confirm').and.returnValue(false)
    component.deleteOrder()
  })

  it('should fail to go to edit order', () => {
    initOrderWithCustomer()
    const order = new Order()
    spyOn(window, 'confirm').and.returnValue(true)
    spyOn(orderEditService, 'deleteOrder').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    spyOn(window, 'alert').and.returnValue(true)
    component.deleteOrder()
  })
});
