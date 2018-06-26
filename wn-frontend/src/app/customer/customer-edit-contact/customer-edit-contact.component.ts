import { Component, OnInit } from '@angular/core'
import { CoreDataService, CoreData } from '../../core/core-data.service'
import { CustomerEditService } from '../customer-edit/customer-edit.service'
import { CustomerContact, Customer } from '../customer.model'
import { UtilService } from '../../core/util.service'
import { CustomerSearchService } from '../customer-search/customer-search.service'

@Component({
  selector: 'app-customer-edit-contact',
  templateUrl: './customer-edit-contact.component.html',
  styleUrls: ['./customer-edit-contact.component.scss']
})
export class CustomerEditContactComponent implements OnInit {

  customer: Customer
  contact_edit: CustomerContact
  coreData: CoreData = new CoreData()

  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService,
    private customerEditService: CustomerEditService,
    private customerSearchService: CustomerSearchService
  ) { }

  ngOnInit() {
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })

    this.contact_edit = this.customerEditService.getCustomerContactToEdit()
  }

  saveCustomerContact() {
    this.customerEditService.saveCustomerContact(this.contact_edit)
      .then((contact) => {
        this.customerSearchService.searchCustomers(null)
        this.util.historyBack()
      })
      .catch((error) => {
        alert('Kundenkontakt konnte nicht gespeichert werden: ' + error.message)
      })
  }

  deleteCustomerContact() {
    if (confirm('Kundenkontakt ' + this.contact_edit.name2 + ', ' + this.contact_edit.name1 + ' wirklich löschen?!')) {
      this.customerEditService.deleteCustomerContact(this.contact_edit)
        .then(() => {
          this.customerSearchService.searchCustomers(null)
          this.util.historyBack()
        })
        .catch((error) => {
          alert('Kundenkontakt konnte nicht gelsöcht werden: ' + error.message)
        })
    }
  }

  cancelEdit() {
    // this.customerSearchService.searchCustomers(null)
    this.util.historyBack()
  }

}
