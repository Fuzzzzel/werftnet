import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPositionViewComponent } from './order-position-view.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderPositionEditComponent } from '../order-position-edit/order-position-edit.component';
import { UtilService } from '../../../core/util.service';
import { CoreDataService } from '../../../core/core-data.service';
import { CoreDataServiceMock } from '../../../core/core-data.service-mock';
import { OrderPosition } from '../order-position.model';
import { OrderTaskService } from '../order-task.service';

describe('OrderPositionViewComponent', () => {
  let component: OrderPositionViewComponent;
  let fixture: ComponentFixture<OrderPositionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        OrderPositionViewComponent,
        OrderPositionEditComponent
      ],
      providers: [
        UtilService,
        OrderTaskService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPositionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit save event and toggle edit mode', () => {
    spyOn(component.save, 'emit')
    const editModeBefore = component.editMode
    component.saveOrderPosition(new OrderPosition())
    expect(component.save.emit).toHaveBeenCalled()
    expect(component.editMode).not.toEqual(editModeBefore)
  })

  it('should emit delete event and stop propagation of event', () => {
    spyOn(component.delete, 'emit')
    const editModeBefore = component.editMode
    let event = new Event('click')
    spyOn(event, 'stopPropagation')
    component.deleteOrderPosition(new OrderPosition(), event)
    expect(component.delete.emit).toHaveBeenCalled()
    expect(event.stopPropagation).toHaveBeenCalled()
  })

  it('should emit delete event ignore get passed null as event', () => {
    spyOn(component.delete, 'emit')
    const editModeBefore = component.editMode
    component.deleteOrderPosition(new OrderPosition(), null)
    expect(component.delete.emit).toHaveBeenCalled()
  })
});
