import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTaskEditComponent } from './order-task-edit.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../../../core/util.service';
import { OrderTaskService } from '../order-task.service';
import { CoreDataService } from '../../../core/core-data.service';
import { CoreDataServiceMock } from '../../../core/core-data.service-mock';
import { OrderTask } from '../order-task.model';

describe('OrderTaskEditComponent', () => {
  let component: OrderTaskEditComponent;
  let fixture: ComponentFixture<OrderTaskEditComponent>;
  let taskService: OrderTaskService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
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
    fixture = TestBed.createComponent(OrderTaskEditComponent);
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
    const task = new OrderTask()
    spyOn(component.save, 'emit')
    component.saveOrderTask(task)
    expect(component.save.emit).toHaveBeenCalled()
  })
});
