import { Component, OnInit } from '@angular/core'
import { CoreData, CoreDataService } from '../../core/core-data.service'
import { CustomerEditService } from './customer-edit.service'
import { Customer } from '../customer.model'
import { PriceLine } from '../../shared/model/price-line.model'
import { UtilService } from '../../core/util.service'
import { CustomerSearchService } from '../customer-search/customer-search.service'

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  cust_edit: Customer
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

    this.cust_edit = this.customerEditService.getCustomerToEdit()
  }

  saveCustomer() {
    return new Promise<Customer>((resolve, reject) => {
      this.customerEditService.saveCustomer(this.cust_edit)
        .then((customer) => {
          resolve(customer)
          this.customerSearchService.searchCustomers(null)
          this.util.historyBack()
        })
        .catch((error) => {
          alert(error.message)
          reject(error)
        })
    })
  }

  deleteCustomer() {
    return new Promise<any>((resolve, reject) => {
      this.customerEditService.deleteCustomer(this.cust_edit)
        .then(() => {
          resolve()
          this.customerSearchService.searchCustomers(null)
          this.util.historyBack()
        })
        .catch((error) => {
          alert(error.message)
          reject(error)
        })
    })
  }

  cancelEdit() {
    // this.customerSearchService.searchCustomers(null)
    this.util.historyBack()
  }

}
