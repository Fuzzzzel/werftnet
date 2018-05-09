import { Component, OnInit } from '@angular/core';
import { CoreData, CoreDataService } from '../../core/core-data.service';
import { CustomerEditService } from './customer-edit.service';
import { Customer } from '../customer.model';
import { PriceLine } from '../../shared/model/price-line.model';
import { UtilService } from '../../core/util.service';
import { CustomerSearchService } from '../customer-search/customer-search.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  cust_edit: Customer;
  coreData: CoreData = new CoreData();

  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService,
    private customerEditService: CustomerEditService,
    private customerSearchService: CustomerSearchService
  ) { }


  saveCustomer() {
    this.customerEditService.saveCustomer(this.cust_edit);
    // ToDo: Reload search list or update customer in list
  }

  deleteCustomer() {
    this.customerEditService.deleteCustomer(this.cust_edit);
    // ToDo: Reload search list or update customer in list
  }

  cancelEdit() {
    // this.customerSearchService.searchCustomers(null);
    this.util.historyBack();
  }

  ngOnInit() {
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data;
    });

    this.cust_edit = this.customerEditService.getCustomerToEdit();
  }
}
