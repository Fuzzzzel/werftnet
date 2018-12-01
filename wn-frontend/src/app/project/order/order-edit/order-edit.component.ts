import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../core/util.service';
import { Customer, CustomerContact } from '../../../customer/customer.model';
import { Order } from '../order.model';
import { CoreData, CoreDataService } from '../../../core/core-data.service';
import { CustomerService } from '../../../customer/customer.service';
import { OrderEditService } from './order-edit.service';
import { OrderSearchService } from '../order-search/order-search.service';
import { OrderPosition } from '../order-position.model';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  order_edit: Order = new Order
  customers: Customer[] = []
  customerContacts: CustomerContact[] = []
  coreData: CoreData = new CoreData()
  orderLoaded: boolean = false

  constructor(
    private route: ActivatedRoute,
    public util: UtilService,
    private coreDataService: CoreDataService,
    private orderEditService: OrderEditService,
    private orderSearchService: OrderSearchService,
    public ngxUiLoaderService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.ngxUiLoaderService.start()
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })

    const orderIdString = this.route.snapshot.paramMap.get('orderId')
    const orderId = parseInt(orderIdString)
    const customerIdString = this.route.snapshot.paramMap.get('customerId')
    const customerId = parseInt(customerIdString)
    this.orderEditService.prepareEditOrder(orderId, customerId)
      .then((order) => {
        this.ngxUiLoaderService.stop()
        this.order_edit = order
      })
      .catch((error) => {
        this.ngxUiLoaderService.stop()
        alert('Order konnte nicht geladen werden: ' + error.message)
      })
  }

  ngOnDestroy() {
    this.ngxUiLoaderService.stop()
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
          this.util.removeFromArray(this.order_edit.positions, position)
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }

}
