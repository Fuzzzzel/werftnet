import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../core/util.service';
import { Customer, CustomerContact } from '../../../customer/customer.model';
import { Order } from '../order.model';
import { CoreData, CoreDataService } from '../../../core/core-data.service';
import { CustomerService } from '../../../customer/customer.service';
import { OrderEditService } from './order-edit.service';
import { OrderSearchService } from '../order-search/order-search.service';
import { OrderPosition } from '../order-position.model';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  order_edit: Order = new Order()
  customers: Customer[] = []
  customerContacts: CustomerContact[] = []
  coreData: CoreData = new CoreData()

  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService,
    private orderEditService: OrderEditService,
    private orderSearchService: OrderSearchService
  ) { }

  ngOnInit() {
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })

    this.order_edit = this.orderEditService.getOrderToEdit()
  }

  cancelEdit() {
    this.util.historyBack()
  }

  saveOrderHead(orderHead) {
    Object.assign(this.order_edit, orderHead)
    this.saveOrder()
  }

  /**
   * Order is updated on server (Order Head)
   * Positions are not updated
   */
  saveOrder() {
    this.orderEditService.saveOrder(this.order_edit)
      .then((data) => {
        this.order_edit = this.orderEditService.getOrderToEdit()
        this.orderSearchService.searchOrders(null)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  deleteOrder() {
    if (confirm('Soll der Auftrag wirklich gelöscht werden?')) {
      this.orderEditService.deleteOrder(this.order_edit)
        .then((data) => {
          this.orderSearchService.searchOrders(null)
          this.util.historyBack()
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }

  createNewPosition() {
    this.orderEditService.createNewPosition(this.order_edit)
      .then((data) => {
        this.order_edit.positions.push(data)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  savePosition(position: OrderPosition) {
    this.orderEditService.savePosition(position)
      .then((data) => {
        console.log(data)
        this.util.updateOrAddObjectInArrayById(this.order_edit.positions, data)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  deletePosition(position: OrderPosition) {
    if (confirm('Soll die Position wirklich gelöscht werden?')) {
      this.orderEditService.deletePosition(position)
        .then((data) => {
          console.log(data)
          this.util.removeFromArray(this.order_edit.positions, position)
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }

}
