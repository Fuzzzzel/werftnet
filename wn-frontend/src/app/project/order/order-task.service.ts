import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../../core/util.service';
import { CoreData, CoreDataService } from '../../core/core-data.service';
import { OrderPosition } from './order-position.model';
import { OrderTask } from './order-task.model';

@Injectable()
export class OrderTaskService {

  coreData: CoreData = new CoreData()

  constructor(
    private util: UtilService,
    private http: HttpClient,
    private coreDataService: CoreDataService
  ) {
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })
  }

  createNewOrderTask(position: OrderPosition) {
    return new Promise<OrderTask>((resolve, reject) => {
      // Set up post request
      let task = new OrderTask()
      task.order_id = position.order_id
      task.position_id = position.id
      this.saveOrderTask(task)
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  saveOrderTask(task: OrderTask) {
    const req = this.http.post<OrderTask>(
      '/orders/' + task.order_id + '/positions/' + task.position_id + '/tasks' + (task.id ? '/' + task.id : ''),
      task
    )

    return new Promise<OrderTask>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve(data)
        },
        error => {
          reject(new Error("Fehler beim Speichern der Aufgabe: " + error.error))
        });
    })
  }

  deleteOrderTask(task: OrderTask) {
    const req = this.http.delete<any>(
      '/orders/' + task.order_id + '/positions/' + task.position_id + '/tasks/' + task.id
    )

    return new Promise<any>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve()
        },
        error => {
          reject(new Error("Fehler beim Löschen der Aufgabe: " + error.error))
        });
    })
  }
}
