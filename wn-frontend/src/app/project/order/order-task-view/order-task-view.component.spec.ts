import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTaskViewComponent } from './order-task-view.component';
import { OrderTaskEditComponent } from '../order-task-edit/order-task-edit.component';
import { UtilService } from '../../../core/util.service';
import { OrderTaskService } from '../order-task.service';
import { CoreDataService } from '../../../core/core-data.service';
import { CoreDataServiceMock } from '../../../core/core-data.service-mock';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderTask } from '../order-task.model';

describe('OrderTaskViewComponent', () => {
  let component: OrderTaskViewComponent;
  let fixture: ComponentFixture<OrderTaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        OrderTaskViewComponent,
        OrderTaskEditComponent
      ],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit save event and toggle edit mode', () => {
    spyOn(component.save, 'emit')
    const editModeBefore = component.editMode
    component.saveOrderTask(new OrderTask())
    expect(component.save.emit).toHaveBeenCalled()
    expect(component.editMode).not.toEqual(editModeBefore)
  })

  it('should emit delete event and toggle edit mode', () => {
    spyOn(component.delete, 'emit')
    const editModeBefore = component.editMode
    component.deleteOrderTask(new OrderTask())
    expect(component.delete.emit).toHaveBeenCalled()
    expect(component.editMode).not.toEqual(editModeBefore)
  })
});
