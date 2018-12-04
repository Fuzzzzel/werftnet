import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UtilService } from './../../core/util.service'
import { BehaviorSubject } from 'rxjs'
import { Order } from './order.model'
import { OrdersLoaded } from './order-search/orders-loaded.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private $lastOrders: BehaviorSubject<OrdersLoaded>;

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) {
    this.$lastOrders = <BehaviorSubject<OrdersLoaded>>new BehaviorSubject(new OrdersLoaded());
  }

  getLastOrders() {
    return this.$lastOrders.asObservable();
  }

  fetchLastOrders() {
    return new Promise<OrdersLoaded>((resolve, reject) => {
      // Set up post request
      const req = this.http.post<OrdersLoaded>(
        '/orderstats/createdlast',
        {}
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          this.$lastOrders.next(data)
          resolve(data)
        },
        error => {
          reject(error)
        });

    })
  }
}
