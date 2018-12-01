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
    private customerEditService: CustomerEditService
  ) { }

  editCustomer(customer: Customer = null) {
    // Reload customer or pass empty new customer
    this.customerEditService.prepareEditCustomer(customer && customer.id)
      .then((customer) => {
        if (customer.id) {
          this.util.goTo(`customer/edit/${customer.id}`)
        } else {
          this.util.goTo(`customer/new`)
        }
      })
      .catch((error) => {
        alert(`Kunde konnte nicht gespeichert werden: ${error.message}`)
      })
  }

  editcontact(customer: Customer, contact: CustomerContact = null) {
    this.customerEditService.prepareEditCustomerContact(customer && customer.id, contact && contact.id)
      .then((contact) => {
        if (contact.id) {
          this.util.goTo(`customer/edit_contact/${customer.id}/${contact.id})`)
        } else {
          this.util.goTo(`customer/new_contact/${customer.id}`)
        }
      })
      .catch((error) => {
        alert('Kunde oder Kundenkontakt wurde nicht angegeben: ' + error.message)
      })
  }

  createNewOrder(customer: Customer) {
    this.util.goTo('order/new/' + customer.id)
  }
}
