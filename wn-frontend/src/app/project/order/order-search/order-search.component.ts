import { Component, OnInit } from '@angular/core'
import { OrderSearchParams } from './order-search-params.model'
import { UtilService } from '../../../core/util.service'
import { OrderSearchService } from './order-search.service'
import { OrderEditService } from '../order-edit/order-edit.service'
import { OrdersLoaded } from './orders-loaded.model';
import { CoreDataService, CoreData } from '../../../core/core-data.service';
import { Order } from '../order.model';
import { Customer } from '../../../customer/customer.model';
import { CustomerService } from '../../../customer/customer-service.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit {

  searchParams: OrderSearchParams = new OrderSearchParams()
  ordersLoaded: OrdersLoaded = new OrdersLoaded()
  customers: Customer[] = []
  coreData: CoreData = new CoreData()

  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService,
    private orderSearchService: OrderSearchService,
    private orderEditService: OrderEditService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.searchParams = this.orderSearchService.getLastSearchParams()

    this.orderSearchService.getOrdersLoaded().subscribe((ordersLoaded) => {
      this.ordersLoaded = ordersLoaded
    })

    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })

    this.customerService.getCustomerDropdownValues().subscribe((data) => {
      this.customers = data
    })
  }

  searchOrders(searchParams) {
    this.orderSearchService.searchOrders(searchParams)
      .then((ordersLoaded) => {
      })
      .catch((error) => {
        alert('Suche der Aufträge fehlgeschlagen: ' + error.message)
      })
  }

  editOrder(orderToEdit: Order) {
    this.orderEditService.prepareEditOrder(orderToEdit && orderToEdit.id)
      .then((order) => {
        this.util.goTo('order/edit')
      })
      .catch((error) => {
        alert('Order konnte nicht zum Bearbeiten geöffnet werden: ' + error.message)
      })
  }

}
