import { Component, OnInit } from '@angular/core'
import { OrderService } from './../../project/order/order.service'
import { UtilService } from './../../core/util.service';
import { OrdersLoaded } from './../../project/order/order-search/orders-loaded.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastOrders: OrdersLoaded
  constructor(
    private orderService: OrderService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.orderService
      .getLastOrders()
      .subscribe((ordersLoaded) => {
        this.lastOrders = ordersLoaded
      })
    this.orderService.fetchLastOrders()
  }

  openOrder(order) {
    this.util.goTo(`/order/edit/${order.id}`)
  }

}
