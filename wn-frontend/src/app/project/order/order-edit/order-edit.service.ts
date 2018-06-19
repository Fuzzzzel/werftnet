import { Injectable } from '@angular/core';
import { Order } from '../order.model';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../../../core/util.service';
import { CoreData } from '../../../core/core-data.service';

@Injectable()
export class OrderEditService {

  orderToEdit: Order = new Order()

  constructor(
    private util: UtilService,
    private http: HttpClient
  ) { }

  prepareEditOrder(id: number) {
    this.orderToEdit = new Order();
    return new Promise<Order>((resolve, reject) => {
      if (id && id > 0) {
        // Reload order before editing
        this.getOrderById(id)
          .then((order) => {
            this.orderToEdit = order
            resolve(order)
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        resolve(this.orderToEdit)
      }
    })
  }

  getOrderById(id: number) {
    // Set up post request
    const req = this.http.get<Order>(
      '/orders/' + id
    )

    return new Promise<Order>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve(data)
        },
        error => {
          reject(new Error(error.error))
        });
    })
  }
}

CoreData
