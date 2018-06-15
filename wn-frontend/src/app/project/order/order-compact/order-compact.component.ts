import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../order.model';
import { UtilService } from '../../../core/util.service';
import { OrderEditService } from '../order-edit/order-edit.service';

@Component({
  selector: 'app-order-compact',
  templateUrl: './order-compact.component.html',
  styleUrls: ['./order-compact.component.scss']
})
export class OrderCompactComponent implements OnInit {

  @Input('order')
  order: Order

  constructor(
    private util: UtilService,
    private orderEditService: OrderEditService
  ) { }

  ngOnInit() {
  }

  editOrder() {
    // Reload order or pass empty new order
    this.orderEditService.prepareEditOrder(this.order.id)
      .then((order) => {
        this.util.goTo('order/edit')
      })
      .catch((error) => {
        alert('Order konnte nicht gespeichert werden: ' + error.message)
      })
  }
}
