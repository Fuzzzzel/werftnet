import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../customer.model';
import { UtilService } from '../../core/util.service';
import { CustomerEditService } from '../customer-edit/customer-edit.service';

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

  editCustomer(customer) {
    // Reload customer or pass empty new customer
    this.customerEditService.editCustomer(customer.id)
  }

  editcontact(customer, contact) {
    this.customerEditService.editCustomerContact(customer, contact);
  }
}
