import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrderCompactComponent } from './order-compact.component';
import { UtilService } from '../../../core/util.service';
import { SharedModule } from '../../../shared/shared.module';
import { OrderEditService } from '../order-edit/order-edit.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Order } from '../order.model';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrderCompactComponent', () => {
  let component: OrderCompactComponent;
  let fixture: ComponentFixture<OrderCompactComponent>;
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'order/edit',
            redirectTo: ''
          }
        ])
      ],
      declarations: [
        OrderCompactComponent
      ],
      providers: [
        UtilService,
        OrderEditService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(OrderCompactComponent);
    component = fixture.componentInstance;

    let order = new Order()
    order.id = 1

    component.order = order
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to edit order', fakeAsync(() => {
    component.editOrder()
    tick()

    const req = backend.expectOne('/orders/' + component.order.id)
    expect(req.request.method).toBe("GET")
    req.flush(component.order, { status: 200, statusText: 'OK' })
  }))

  it('should fail to go to edit order', fakeAsync(() => {
    spyOn(window, 'alert').and.returnValue(true)
    component.editOrder()
    tick()

    const req = backend.expectOne('/orders/' + component.order.id)
    expect(req.request.method).toBe("GET")
    req.flush([], { status: 404, statusText: 'Not Found' })
  }))
})
