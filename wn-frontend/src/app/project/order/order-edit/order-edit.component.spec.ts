import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

describe('OrderEditComponent', () => {
  let component: OrderEditComponent
  let fixture: ComponentFixture<OrderEditComponent>
  let backend: HttpTestingController
  let orderEditService: OrderEditService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        OrderPositionEditComponent
      ],
      providers: [
        UtilService,
        CustomerService,
        OrderEditService,
        OrderSearchService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(OrderEditComponent);
    component = fixture.componentInstance;
    orderEditService = TestBed.get(OrderEditService)
  });

  function initOrderWithCustomer() {
    orderEditService.orderToEdit = new Order()
    orderEditService.orderToEdit.customer = new Customer()
    orderEditService.orderToEdit.customer.id = 99
    fixture.detectChanges();
  }

  function initOrderWithoutCustomer() {
    fixture.detectChanges()
  }

  it('should create', () => {
    initOrderWithCustomer()
    expect(component).toBeTruthy();
  })

  it('should cancel edit', () => {
    initOrderWithoutCustomer()
    component.cancelEdit()
  })

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
