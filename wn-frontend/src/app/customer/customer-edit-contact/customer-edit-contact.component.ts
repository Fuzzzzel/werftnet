import { Component, OnInit } from '@angular/core';
import { CoreDataService, CoreData } from '../../core/core-data.service';
import { CustomerEditService } from '../customer-edit/customer-edit.service';
import { CustomerContact } from '../customer.model';
import { UtilService } from '../../core/util.service';
import { CustomerSearchService } from '../customer-search/customer-search.service';

@Component({
  selector: 'app-customer-edit-contact',
  templateUrl: './customer-edit-contact.component.html',
  styleUrls: ['./customer-edit-contact.component.scss']
})
export class CustomerEditContactComponent implements OnInit {

  contact_edit: CustomerContact;
  coreData: CoreData = new CoreData();

  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService,
    private customerEditService: CustomerEditService,
    private customerSearchService: CustomerSearchService
  ) { }

  saveCustomerContact() {
    return new Promise<CustomerContact>((resolve, reject) => {
      this.customerEditService.saveCustomerContact(this.contact_edit)
        .then((contact) => {
          this.customerSearchService.searchCustomers(null);
          resolve(contact)
          this.util.historyBack()
        })
        .catch((error) => {
          alert(error.message)
          reject(error)
        })
    })
  }

  deleteCustomerContact() {
    return new Promise<any>((resolve, reject) => {
      this.customerEditService.deleteCustomerContact(this.contact_edit)
        .then(() => {
          resolve()
          this.customerSearchService.searchCustomers(null)
          this.util.historyBack();
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  cancelEdit() {
    // this.customerSearchService.searchCustomers(null);
    this.util.historyBack();
  }

  ngOnInit() {
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data;
    });

    this.contact_edit = this.customerEditService.getCustomerContactToEdit();
  }
}
