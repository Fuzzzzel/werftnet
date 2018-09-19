import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPositionEditComponent } from './order-position-edit.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../../../core/util.service';
import { CoreDataService } from '../../../core/core-data.service';
import { CoreDataServiceMock } from '../../../core/core-data.service-mock';
import { OrderTaskService } from '../order-task.service';
import { OrderTask } from '../order-task.model';
import { OrderTaskViewComponent } from '../order-task-view/order-task-view.component';
import { OrderTaskEditComponent } from '../order-task-edit/order-task-edit.component';

describe('OrderPositionEditComponent', () => {
  let component: OrderPositionEditComponent;
  let fixture: ComponentFixture<OrderPositionEditComponent>;
  let taskService: OrderTaskService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
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
    fixture = TestBed.createComponent(OrderPositionEditComponent);
    taskService = TestBed.get(OrderTaskService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit')
    component.cancelEdit()
    expect(component.cancel.emit).toHaveBeenCalled()
  })

  it('should emit save event', () => {
    spyOn(component.save, 'emit')
    component.savePosition()
    expect(component.save.emit).toHaveBeenCalled()
  })

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit')
    component.deletePosition()
    expect(component.delete.emit).toHaveBeenCalled()
  })

  it('should create new task', () => {
    spyOn(taskService, 'createNewOrderTask').and.callFake(function () {
      return new Promise((resolve, reject) => {
        resolve(new OrderTask())
      })
    })

    component.createNewOrderTask()
  })

  it('should fail to create new task', () => {
    spyOn(taskService, 'createNewOrderTask').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject(new Error('Promise failed'))
      })
    })
    spyOn(window, 'alert').and.returnValue(true)

    component.createNewOrderTask()
  })

  it('should save task', () => {
    spyOn(taskService, 'saveOrderTask').and.callFake(function () {
      return new Promise((resolve, reject) => {
        resolve(new OrderTask())
      })
    })

    component.saveOrderTask(new OrderTask())
  })

  it('should fail to save task', () => {
    spyOn(taskService, 'saveOrderTask').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject(new Error('Promise failed'))
      })
    })
    spyOn(window, 'alert').and.returnValue(true)

    component.saveOrderTask(new OrderTask())
  })

  it('should delete task', () => {
    let task = new OrderTask()
    task.id = 1
    task.position_id = 2
    task.order_id = 3

    spyOn(taskService, 'deleteOrderTask').and.callFake(function () {
      return new Promise((resolve, reject) => {
        resolve(null)
      })
    })

    component.deleteOrderTask(task)
  })

  it('should fail to delete task', () => {
    let task = new OrderTask()
    task.id = 1
    task.position_id = 2
    task.order_id = 3

    spyOn(taskService, 'deleteOrderTask').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject(new Error('Promise failed'))
      })
    })
    spyOn(window, 'alert').and.returnValue(true)

    component.deleteOrderTask(task)
  })
});
