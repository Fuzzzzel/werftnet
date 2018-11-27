import { Component, OnInit, Input } from '@angular/core'
import { Customer, CustomerContact } from '../customer.model'
import { UtilService } from '../../core/util.service'
import { CustomerEditService } from '../customer-edit/customer-edit.service'
import { OrderEditService } from '../../project/order/order-edit/order-edit.service';

@Component({
  selector: 'app-customer-compact',
  templateUrl: './customer-compact.component.html',
  styleUrls: ['./customer-compact.component.scss']
})
export class CustomerCompactComponent {

  @Input('customer')
  customer: Customer

  constructor(
    private util: UtilService,
    private customerEditService: CustomerEditService,
    private orderEditService: OrderEditService
  ) { }

  editCustomer(customer) {
    // Reload customer or pass empty new customer
    this.customerEditService.prepareEditCustomer(customer.id)
      .then((customer) => {
        this.util.goTo('customer/edit')
      })
      .catch((error) => {
        alert('Kunde konnte nicht gespeichert werden: ' + error.message)
      })
  }

  editcontact(customer: Customer, contact: CustomerContact) {
    this.customerEditService.prepareEditCustomerContact(customer && customer.id, contact && contact.id)
      .then(() => {
        this.util.goTo('customer/edit_contact')
      })
      .catch((error) => {
        alert('Kundenkontakt konnte nicht gespeichert werden: ' + error.message)
      })
  }

  createNewOrder(customer: Customer) {
    this.util.goTo('order/new/' + customer.id)
  }
}
