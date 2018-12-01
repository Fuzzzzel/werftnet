import { Component, OnInit } from '@angular/core'
import { CoreDataService, CoreData } from '../../core/core-data.service'
import { CustomerEditService } from '../customer-edit/customer-edit.service'
import { CustomerContact, Customer } from '../customer.model'
import { UtilService } from '../../core/util.service'
import { CustomerSearchService } from '../customer-search/customer-search.service'
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-customer-edit-contact',
  templateUrl: './customer-edit-contact.component.html',
  styleUrls: ['./customer-edit-contact.component.scss']
})
export class CustomerEditContactComponent implements OnInit {

  customerId: number
  contact_edit: CustomerContact = new CustomerContact()
  coreData: CoreData = new CoreData()

  constructor(
    private route: ActivatedRoute,
    public util: UtilService,
    private coreDataService: CoreDataService,
    private customerEditService: CustomerEditService,
    private customerSearchService: CustomerSearchService,
    public ngxUiLoaderService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.ngxUiLoaderService.start()
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })


    const customerIdString = this.route.snapshot.paramMap.get('customerId')
    this.customerId = parseInt(customerIdString)
    const contactIdString = this.route.snapshot.paramMap.get('contactId')
    const contactId = parseInt(contactIdString)
    this.customerEditService
      .prepareEditCustomerContact(this.customerId, contactId)
      .then((customerContact) => {
        this.ngxUiLoaderService.stop()
        this.contact_edit = customerContact
      })
      .catch((error) => {
        this.ngxUiLoaderService.stop()
        alert(`Kontakt konnte nicht geladen werden: ${error.message}`)
      })
  }

  ngOnDestroy() {
    this.ngxUiLoaderService.stop()
  }

  saveCustomerContact() {
    this.customerEditService.saveCustomerContact(this.customerId, this.contact_edit)
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
      this.customerEditService.deleteCustomerContact(this.customerId, this.contact_edit)
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
