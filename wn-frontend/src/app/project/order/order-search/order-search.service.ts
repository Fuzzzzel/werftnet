import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrdersLoaded } from './orders-loaded.model';
import { OrderSearchParams } from './order-search-params.model';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../../../core/util.service';

@Injectable()
export class OrderSearchService {

  private $ordersLoaded: BehaviorSubject<OrdersLoaded>;
  private lastSearchParams: OrderSearchParams = new OrderSearchParams();

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) {
    this.$ordersLoaded = <BehaviorSubject<OrdersLoaded>>new BehaviorSubject(new OrdersLoaded);
  }

  getOrdersLoaded() {
    return this.$ordersLoaded.asObservable();
  }

  getLastSearchParams() {
    return this.lastSearchParams;
  }

  searchOrders(searchParams) {
    if (searchParams) {
      this.lastSearchParams = searchParams;
    }

    return new Promise<OrdersLoaded>((resolve, reject) => {
      // Set up post request
      const req = this.http.post<OrdersLoaded>(
        '/orders/search',
        searchParams || this.lastSearchParams
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          this.$ordersLoaded.next(data)
          console.log(data)
          resolve(data)
        },
        error => {
          reject(error)
        });

    })
  }
}
