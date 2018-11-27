import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrderCompactComponent } from './order-compact.component';
import { UtilService } from '../../../core/util.service';
import { SharedModule } from '../../../shared/shared.module';
import { OrderEditService } from '../order-edit/order-edit.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Order } from '../order.model';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreDataServiceMock } from '../../../core/core-data.service-mock';
import { CoreDataService } from '../../../core/core-data.service';
import { CustomerService } from '../../../customer/customer.service';

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
            path: 'order/edit/:orderId',
            redirectTo: ''
          }
        ])
      ],
      declarations: [
        OrderCompactComponent
      ],
      providers: [
        UtilService,
        OrderEditService,
        CustomerService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
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
  }))
})
