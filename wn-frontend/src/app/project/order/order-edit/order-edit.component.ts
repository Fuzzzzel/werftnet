import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../core/util.service';
import { Customer, CustomerContact } from '../../../customer/customer.model';
import { Order } from '../order.model';
import { CoreData, CoreDataService } from '../../../core/core-data.service';
import { CustomerService } from '../../../customer/customer.service';

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
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })

    this.customerService.getCustomerDropdownValues().subscribe((data) => {
      this.customers = data
    })
  }

  reloadCustomerContacts(customer) {
    if (customer && customer.id) {
      this.customerService.fetchCustomerContacts(customer.id)
        .then((data) => {
          this.order_edit.customer_contact = null
          this.customerContacts = data
        })
        .catch((error) => {
          alert(error.message)
        })
    } else {
      this.order_edit.customer_contact = null
      this.customerContacts = []
    }
  }

  cancelEdit() {
    this.util.historyBack()
  }

  saveOrder() {
    alert('Noch nicht implementiert!')
  }

  deleteOrder() {
    alert('Noch nicht implementiert!')
  }

}
