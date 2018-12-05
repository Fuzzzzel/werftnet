import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HomeComponent } from './home.component'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderService } from './../../project/order/order.service';
import { UtilService } from './../../core/util.service';
import { Order } from './../../project/order/order.model';
import { OrdersLoaded } from './../../project/order/order-search/orders-loaded.model';
import { NgxUiLoaderService, NgxUiLoaderModule } from 'ngx-ui-loader';

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        NgxUiLoaderModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'order/edit/:orderId',
            redirectTo: ''
          }
        ])
      ],
      providers: [
        OrderService,
        UtilService,
        NgxUiLoaderService
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    const ordersLoaded = new OrdersLoaded()
    const req = backend.expectOne('/orderstats/createdlast')
    expect(req.request.method).toBe("POST")
    req.flush(ordersLoaded, { status: 200, statusText: 'OK' })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate to order selected', () => {
    const order = new Order
    order.id = 1
    component.openOrder(order)
  })
})
