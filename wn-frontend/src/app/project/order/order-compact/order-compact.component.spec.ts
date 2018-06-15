import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCompactComponent } from './order-compact.component';
import { UtilService } from '../../../core/util.service';
import { SharedModule } from '../../../shared/shared.module';
import { OrderEditService } from '../order-edit/order-edit.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrderCompactComponent', () => {
  let component: OrderCompactComponent;
  let fixture: ComponentFixture<OrderCompactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
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
    fixture = TestBed.createComponent(OrderCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
