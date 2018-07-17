import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { OrderHeadViewComponent } from './order-head-view.component'
import { OrderHeadEditComponent } from '../order-head-edit/order-head-edit.component'
import { SharedModule } from '../../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Order } from '../../order.model'
import { UtilService } from '../../../../core/util.service';
import { CoreDataService } from '../../../../core/core-data.service';
import { CoreDataServiceMock } from '../../../../core/core-data.service-mock';
import { CustomerService } from '../../../../customer/customer.service';

describe('OrderHeadViewComponent', () => {
  let component: OrderHeadViewComponent
  let fixture: ComponentFixture<OrderHeadViewComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        OrderHeadViewComponent,
        OrderHeadEditComponent
      ],
      providers: [
        CustomerService,
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHeadViewComponent)
    component = fixture.componentInstance
    component.order = new Order()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should toggle edit mode', () => {
    component.editMode = false
    component.toggleEditMode()
    expect(component.editMode).toBeTruthy()
    component.toggleEditMode()
    expect(component.editMode).toBeFalsy()
  })

  it('should emit save event', () => {
    let orderHead = new Order()
    delete orderHead['positions']

    spyOn(component.save, 'emit')
    component.saveOrderHead(orderHead)
    expect(component.save.emit).toHaveBeenCalledWith(orderHead)
  })
})
