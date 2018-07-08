import { Injectable } from '@angular/core';
import { Order, OrderStatus } from '../order.model';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../../../core/util.service';
import { CoreData, CoreDataService } from '../../../core/core-data.service';
import { Customer } from '../../../customer/customer.model';
import { OrderPosition } from '../order-position.model';

@Injectable()
export class OrderEditService {

  orderToEdit: Order = new Order()
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

  getOrderToEdit() {
    return this.orderToEdit
  }

  setOrderStatusTo(newStatusValue: string) {
    let newStatus = this.coreData.order_status.values.find(status => status.value === newStatusValue)
    if (newStatus && newStatus.value) {
      this.orderToEdit.status = newStatus
    } else {
      throw new Error('Der Status "' + newStatus + '" existiert nicht!')
    }
  }

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
        this.setOrderStatusTo('CREATED')
        resolve(this.orderToEdit)
      }
    })
  }

  setCustomer(customer: Customer) {
    this.orderToEdit.customer = customer
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

  saveOrder(orderToSave) {
    // Set up post request
    const req = this.http.post<Order>(
      '/orders' + (orderToSave.id ? '/' + orderToSave.id : ''),
      orderToSave
    )

    return new Promise<Order>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          this.orderToEdit = data
          resolve(data)
        },
        error => {
          reject(new Error("Fehler beim Speichern: " + error.error))
        });
    })
  }

  deleteOrder(orderToDelete) {
    return new Promise<any>((resolve, reject) => {
      if (!orderToDelete || !orderToDelete.id) {
        reject(new Error('Auftrag oder Auftrags-Id fehlt!'))
        return
      }

      // Set up post request
      const req = this.http.delete<any>(
        '/orders/' + orderToDelete.id
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve()
        },
        error => {
          reject(new Error('Fehler beim Löschen:' + error.message));
        });
    })
  }

  createNewPosition(order) {
    return new Promise<OrderPosition>((resolve, reject) => {
      // Set up post request
      let newPosition = new OrderPosition()
      newPosition.order_id = order.id
      this.savePosition(newPosition)
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  savePosition(position: OrderPosition) {
    const req = this.http.post<OrderPosition>(
      '/orders/' + position.order_id + '/positions' + (position.id ? '/' + position.id : ''),
      position
    )

    return new Promise<OrderPosition>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve(data)
        },
        error => {
          reject(new Error("Fehler beim Speichern der Position: " + error.error))
        });
    })
  }

  deletePosition(position: OrderPosition) {
    const req = this.http.delete<any>(
      '/orders/' + position.order_id + '/positions/' + position.id
    )

    return new Promise<any>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve()
        },
        error => {
          reject(new Error("Fehler beim Löschen der Position: " + error.error))
        });
    })
  }

  refreshPositions() {
    this.fetchPositions()
      .then((data) => {
        this.orderToEdit.positions = data
      })
      .catch((error) => {
        // Handle error
      })
  }

  fetchPositions() {
    return new Promise<OrderPosition[]>((resolve, reject) => {
      // Fetch positions and return
      // Set up post request
      const req = this.http.get<OrderPosition[]>(
        '/orders/' + this.orderToEdit.id + '/positions'
      )

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
