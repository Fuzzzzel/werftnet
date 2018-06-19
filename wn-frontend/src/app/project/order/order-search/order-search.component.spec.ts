import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

describe('OrderSearchComponent', () => {
  let component: OrderSearchComponent
  let fixture: ComponentFixture<OrderSearchComponent>
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
        ]),
        NgbModule
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
