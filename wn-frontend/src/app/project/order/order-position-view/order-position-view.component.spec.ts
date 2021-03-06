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
import { OrderTaskViewComponent } from '../order-task-view/order-task-view.component';
import { OrderTaskEditComponent } from '../order-task-edit/order-task-edit.component';

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
        OrderPositionEditComponent,
        OrderTaskViewComponent,
        OrderTaskEditComponent
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

  it('should emit delete event if confirmed', () => {
    spyOn(component.delete, 'emit')
    component.deleteOrderPosition(new OrderPosition())
    expect(component.delete.emit).toHaveBeenCalled()
  })
});
