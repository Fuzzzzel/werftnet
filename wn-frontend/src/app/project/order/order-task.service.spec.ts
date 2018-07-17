import { TestBed, inject } from '@angular/core/testing';

import { OrderTaskService } from './order-task.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from '../../core/util.service';
import { OrderTask } from './order-task.model';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataService } from '../../core/core-data.service';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { OrderPosition } from './order-position.model';

describe('OrderTaskService', () => {
  let service: OrderTaskService
  let backend: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        OrderTaskService,
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    });

    service = TestBed.get(OrderTaskService)
    backend = TestBed.get(HttpTestingController)
  });

  it('should be created', inject([OrderTaskService], (service: OrderTaskService) => {
    expect(service).toBeTruthy();
  }));

  it('should create new task', (done) => {
    let position = new OrderPosition()
    position.id = 1
    position.order_id = 2
    service.createNewTask(position)
      .then((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + position.order_id + '/positions/' + position.id + '/tasks')
    expect(req.request.method).toBe("POST")
    req.flush(new OrderTask(), { status: 200, statusText: 'OK' })
  })

  it('should fail to create new task', (done) => {
    let position = new OrderPosition()
    position.id = 1
    position.order_id = 2
    service.createNewTask(position)
      .catch((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + position.order_id + '/positions/' + position.id + '/tasks')
    expect(req.request.method).toBe("POST")
    req.flush(new OrderTask(), { status: 404, statusText: 'Not Found' })
  })

  it('should save existing task', (done) => {
    let task = new OrderTask()
    task.id = 10
    task.order_id = 1
    task.position_id = 2
    service.saveTask(task)
      .then((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + task.order_id + '/positions/' + task.position_id + '/tasks/' + task.id)
    expect(req.request.method).toBe("POST")
    req.flush(task, { status: 200, statusText: 'OK' })
  })

  it('should fail to save task', (done) => {
    let task = new OrderTask()
    task.order_id = 1
    task.position_id = 2
    service.saveTask(task)
      .catch((error) => {
        done()
      })

    const req = backend.expectOne('/orders/' + task.order_id + '/positions/' + task.position_id + '/tasks')
    expect(req.request.method).toBe("POST")
    req.flush(task, { status: 404, statusText: 'Not Found' })
  })

  it('should delete task', (done) => {
    let task = new OrderTask()
    task.id = 10
    task.order_id = 1
    task.position_id = 2
    service.deleteTask(task)
      .then((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + task.order_id + '/positions/' + task.position_id + '/tasks/' + task.id)
    expect(req.request.method).toBe("DELETE")
    req.flush(task, { status: 200, statusText: 'OK' })
  })

  it('should fail to delete Position', (done) => {
    let task = new OrderTask()
    task.id = 10
    task.order_id = 1
    task.position_id = 2
    service.deleteTask(task)
      .catch((data) => {
        done()
      })

    const req = backend.expectOne('/orders/' + task.order_id + '/positions/' + task.position_id + '/tasks/' + task.id)
    expect(req.request.method).toBe("DELETE")
    req.flush(task, { status: 404, statusText: 'Not Found' })
  })
});
