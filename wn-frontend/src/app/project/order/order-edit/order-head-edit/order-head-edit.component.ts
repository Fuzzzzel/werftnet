import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../order.model';
import { Customer, CustomerContact } from '../../../../customer/customer.model';
import { CoreData, CoreDataService } from '../../../../core/core-data.service';
import { UtilService } from '../../../../core/util.service';
import { CustomerService } from '../../../../customer/customer.service';

@Component({
  selector: 'app-order-head-edit',
  templateUrl: './order-head-edit.component.html',
  styleUrls: ['./order-head-edit.component.scss']
})
export class OrderHeadEditComponent implements OnInit {

  @Input('order')
  order: Order = new Order()
  orderHead: any
  customers: Customer[] = []
  customerContacts: CustomerContact[] = []
  coreData: CoreData = new CoreData()

  @Output()
  save: EventEmitter<Order> = new EventEmitter<Order>()
  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>()

  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.orderHead = this.util.cloneDeep(this.order)
    delete this.orderHead['positions']

    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })

    this.customerService.getCustomerDropdownValues().subscribe((data) => {
      this.customers = data
    })

    if (this.orderHead.customer) {
      this.reloadCustomerContacts(this.orderHead.customer)
    }
  }

  reloadCustomerContacts(customer) {
    if (customer && customer.id) {
      this.customerService.fetchCustomerContacts(customer.id)
        .then((data) => {
          const contactIsInReloadedList = this.util.isObjectIdInArray(data, this.orderHead.customer_contact)
          if (!contactIsInReloadedList) {
            this.orderHead.customer_contact = null
          }
          this.customerContacts = data
        })
        .catch((error) => {
          alert(error.message)
        })
    } else {
      this.orderHead.customer_contact = null
      this.customerContacts = []
    }
  }

  saveOrderHead() {
    this.save.emit(this.orderHead)
  }

  cancelEditHead() {
    this.cancel.emit()
  }

}
